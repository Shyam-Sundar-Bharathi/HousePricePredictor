from flask import Flask, request, jsonify
import util
app = Flask(__name__)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations' : util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/get_approach_types', methods=['GET'])
def get_approach_types():
    response = jsonify({
        'approachtypes' : util.get_approach_types()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bed = float(request.form['bed'])
    bath = float(request.form['bath'])
    park = float(request.form['park'])
    approach_road = request.form['approach_road']
    dist_mainroad = float(request.form['dist_mainroad'])
    age = float(request.form['age'])
    response = jsonify({
        'estimated_price' : util.get_estimated_price(location, total_sqft, dist_mainroad, bed, bath, park, age, approach_road)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    print('Starting Python Flask Server....')
    util.load_saved_artifacts()
    app.run()