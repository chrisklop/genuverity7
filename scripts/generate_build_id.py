import json
import time
import os

build_data = {
    "buildId": str(int(time.time())),
    "timestamp": time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime())
}

with open("build-id.json", "w") as f:
    json.dump(build_data, f)

print(f"Generated build-id.json: {build_data['buildId']}")
