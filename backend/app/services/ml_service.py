import joblib
import pandas as pd
from pathlib import Path


class MLRiskService:
    """
    Numerical Risk Assessment Service
    ---------------------------------
    Loads the trained XGBoost model once and performs
    preprocessing + feature engineering + inference.
    """

    def __init__(self):

        BASE_DIR = Path(__file__).resolve().parent.parent.parent

        model_path = BASE_DIR / "models" / "xgboost_carbon_model.pkl"
        encoder_path = BASE_DIR / "models" / "label_encoders.pkl"

        self.model = joblib.load(model_path)
        self.encoders = joblib.load(encoder_path)

        self.feature_order = [
            "Industry_Type",
            "Energy_Demand_MWh",
            "Fuel_Type",
            "Emission_Produced_tCO2",
            "Emission_Allowance_tCO2",
            "Carbon_Price_USD_per_t",
            "Transaction_Type",
            "Credits_Traded_tCO2",
            "Compliance_Cost_USD",
            "Optimization_Scenario",
            "Carbon_Cost_Savings_USD",
            "Emissions_per_MWh",
            "Allowance_Usage_Ratio",
            "Cost_per_Credit",
            "Emission_Deficit",
            "Emission_Deficit_Ratio",
            "Revenue_per_MWh",
            "Total_Carbon_Exposure",
            "Net_Position"
        ]

    # -------------------------------------------------
    # Encode categorical values
    # -------------------------------------------------

    def encode(self, df):

        categorical_columns = [
            "Industry_Type",
            "Fuel_Type",
            "Transaction_Type",
            "Optimization_Scenario"
        ]

        for col in categorical_columns:

            encoder = self.encoders[col]

            try:
                df[col] = encoder.transform(df[col])

            except ValueError:
                # unseen category
                df[col] = 0

        return df

    # -------------------------------------------------
    # Feature Engineering
    # -------------------------------------------------

    def engineer_features(self, df):

        df["Emissions_per_MWh"] = (
            df["Emission_Produced_tCO2"]
            / (df["Energy_Demand_MWh"] + 1)
        )

        df["Allowance_Usage_Ratio"] = (
            df["Emission_Produced_tCO2"]
            / (df["Emission_Allowance_tCO2"] + 1)
        )

        df["Cost_per_Credit"] = (
            df["Compliance_Cost_USD"]
            / (df["Credits_Traded_tCO2"] + 1)
        )

        df["Emission_Deficit"] = (
            df["Emission_Produced_tCO2"]
            - df["Emission_Allowance_tCO2"]
        )

        df["Emission_Deficit_Ratio"] = (
            df["Emission_Deficit"]
            / (df["Emission_Allowance_tCO2"] + 1)
        )

        df["Revenue_per_MWh"] = (
            df["Carbon_Cost_Savings_USD"]
            / (df["Energy_Demand_MWh"] + 1)
        )

        df["Total_Carbon_Exposure"] = (
            df["Emission_Produced_tCO2"]
            * df["Carbon_Price_USD_per_t"]
        )

        df["Net_Position"] = (
            df["Credits_Traded_tCO2"]
            - df["Emission_Deficit"]
        )

        return df

    # -------------------------------------------------
    # Prepare Model Input
    # -------------------------------------------------

    def preprocess(self, project):

        df = pd.DataFrame([project])

        df = self.encode(df)

        df = self.engineer_features(df)

        return df[self.feature_order]

    # -------------------------------------------------
    # Predict Risk
    # -------------------------------------------------

    def predict(self, project):

        X = self.preprocess(project)

        raw_probability = float(
            self.model.predict_proba(X)[0][1]
        )

        # Slight calibration to reduce overconfidence
        probability = round(raw_probability * 0.80, 4)

        if probability >= 0.80:
            level = "HIGH"

        elif probability >= 0.50:
            level = "MEDIUM"

        else:
            level = "LOW"

        return {
            "numerical_risk_score": round(probability, 4),
            "risk_level": level
        }


# Singleton
ml_service = MLRiskService()