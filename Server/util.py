import json
import pickle
import numpy as np

__locations = None
__data_columns = None
__approach_columns = None
__model = None

def get_estimated_price(area, sqft, dist_mainroad, bed, bath, park, age, approach):
    try:
        loc_index = __data_columns.index(area.lower())
    except:
        loc_index = -1
    try:
        street_index = __data_columns.index(approach.lower())
    except:
        street_index = -1
    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = dist_mainroad
    x[2] = bed
    x[3] = bath
    x[4] = park
    x[5] = age
    if street_index >= 0:
        x[street_index]=1
    if loc_index >= 0:
        x[loc_index]=1
    return round(__model.predict([x])[0]*1.2)
    
def get_location_names():
    return __locations

def get_data_columns():
    return __data_columns

def get_approach_types():
    return __approach_columns

def load_saved_artifacts():
    print("Loading Saved Artifacts....")
    global __data_columns
    global __locations
    global __approach_columns
    global __model
    with open('./artifacts/columns.json','r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[8:]
        __approach_columns = __data_columns[6:8]
    with open('./artifacts/predictor.pickle', 'rb') as f:
        __model = pickle.load(f)
    print("Loaded Saved Artifacts....")

load_saved_artifacts()
if __name__ == '__main__':
    print(get_location_names())
    print(get_approach_types())
    print(get_estimated_price('velachery', 1600, 200, 3, 2, 0, 20, 'gravel'))