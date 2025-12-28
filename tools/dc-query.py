#!/usr/bin/env python3
"""
Data Commons Query Script for GenuVerity Reports
Direct REST API integration when MCP is unavailable

Usage:
    python3 tools/dc-query.py "UnemploymentRate_Person" "country/USA"
"""

import os
import sys
import json
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urlencode

# Load API key from .env
def load_env():
    env_path = Path(__file__).parent.parent / ".env"
    env_vars = {}
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            if "=" in line and not line.startswith("#"):
                key, val = line.split("=", 1)
                env_vars[key.strip()] = val.strip()
    return env_vars

def query_datacommons(variable: str, entity: str, api_key: str) -> dict:
    """Query Data Commons V2 Observation API"""
    if not api_key:
        return {"error": "API Key required for V2 API"}
        
    url = "https://api.datacommons.org/v2/observation"
    
    # Data Commons v2 API requires POST with JSON body
    data = {
        "select": ["variable", "entity", "value", "date"],
        "variable": {"dcids": [variable]},
        "entity": {"dcids": [entity]}
    }
    
    try:
        req = Request(url, data=json.dumps(data).encode("utf-8"), method="POST")
        req.add_header("X-API-Key", api_key)
        req.add_header("Content-Type", "application/json")
        
        with urlopen(req) as resp:
            return json.loads(resp.read().decode())
    except Exception as e:
        error_info = {"error": str(e), "url": url}
        if hasattr(e, 'read'):
            try:
                error_body = e.read().decode()
                error_info["body"] = error_body
                try:
                    error_info["json_body"] = json.loads(error_body)
                except:
                    pass
            except:
                pass
        return error_info

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 dc-query.py <variable> <entity>")
        print("Example: python3 dc-query.py UnemploymentRate_Person country/USA")
        sys.exit(1)
    
    env = load_env()
    api_key = env.get("DC_API_KEY")
    
    if not api_key:
        print("Error: DC_API_KEY not found in .env file")
        sys.exit(1)
    
    variable = sys.argv[1]
    entity = sys.argv[2]
    
    print(f"Querying Data Commons (V2 API): {variable} for {entity}...")
    result = query_datacommons(variable, entity, api_key)
    
    # Check for observation data
    try:
        obs_list = result["byVariable"][variable]["byEntity"][entity]["orderedFacets"][0]["observations"]
        latest = obs_list[-1]
        print(json.dumps(result, indent=2))
        print(f"\n✅ LATEST OBSERVATION: {latest['value']} ({latest['date']})")
    except KeyError:
        print(json.dumps(result, indent=2))
        print("\n⚠️ No observation data found in response structure")

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 dc-query.py <variable> <entity>")
        print("Example: python3 dc-query.py UnemploymentRate_Person country/USA")
        print("\nCommon variables:")
        print("  - UnemploymentRate_Person")
        print("  - Count_Person")
        print("  - Median_Income_Person")
        print("  - CumulativeCount_Vaccine_COVID_19_Administered")
        print("  - Count_Death")
        sys.exit(1)
    
    env = load_env()
    api_key = env.get("DC_API_KEY")
    
    if not api_key:
        print("Error: DC_API_KEY not found in .env file")
        sys.exit(1)
    
    variable = sys.argv[1]
    entity = sys.argv[2]
    
    print(f"Querying Data Commons: {variable} for {entity}...")
    result = query_datacommons(variable, entity, api_key)
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()
