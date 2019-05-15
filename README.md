# Script to match panorama csv file and s3 images

### CLI

```
mkdir data/
echo "image" > data/images.csv
aws s3 ls s3://housing-passports-pilot/data/streetview/corrected_cubics/ | awk '{print $4}' >> data/images.csv
aws s3 cp s3://housing-passports-pilot/data/streetview/68/Bogota_panorama_v3.csv data/Bogota_panorama_v3.csv
node index.js > data/output.json
in2csv data/output.json > data/result.csv
csv2geojson --lat 'latitude[deg]' --lon 'longitude[deg]'  --delimiter ',' data/result.csv > data/output.geojson
```