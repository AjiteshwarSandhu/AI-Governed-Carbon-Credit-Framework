import joblib

# ==============================
# Load XGBoost Model
# ==============================

MODEL_PATH = r"D:\carbon-validation\backend\app\models\xgboost_carbon_model.pkl"

model = joblib.load(MODEL_PATH)

print("=" * 70)
print("MODEL INFORMATION")
print("=" * 70)

print(type(model))

print()

try:
    print("Feature Names:")
    print(model.feature_names_in_)
except Exception as e:
    print("feature_names_in_ not available")
    print(e)

print()

# ==============================
# Load Encoders
# ==============================

ENCODER_PATH = r"D:\carbon-validation\backend\app\models\label_encoders_xgboost.pkl"

encoders = joblib.load(ENCODER_PATH)

print("=" * 70)
print("ENCODERS")
print("=" * 70)

print(type(encoders))

print()

if isinstance(encoders, dict):

    print("Encoder Keys:")

    for key in encoders.keys():
        print(key)

else:
    print(encoders)

print()

print("=" * 70)
print("DONE")
print("=" * 70)