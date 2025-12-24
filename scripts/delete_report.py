
import re

def delete_report_id_0():
    input_file = "js/reports-data.js"
    
    with open(input_file, 'r') as f:
        content = f.read()
    
    # Extract the JS object part (assuming standard formatting from previous interactions)
    # We look for const REPORTS_DATA = [ ... ];
    
    # Simple strategy:
    # 1. content is strictly structured. removing the first object block inside the array.
    # However, doing this with regex on a large file is risky.
    
    # Alternative: Use the fact that I know exactly what I added.
    # But I also need to decrement all other IDs.
    
    # Let's try to find the start of the array
    start_marker = "const REPORTS_DATA = ["
    start_index = content.find(start_marker)
    
    if start_index == -1:
        print("Error: Could not find REPORTS_DATA start")
        return

    # Find the first object (ID 0)
    # The new report is at the top.
    
    # We can perform a robust re-indexing.
    # 1. Read file line by line.
    
    lines = content.split('\n')
    new_lines = []
    
    in_data_array = False
    skip_current_object = False # We want to skip the object with id: 0
    brace_balance = 0
    
    # Identify where the data starts
    # It usually starts with "const REPORTS_DATA = ["
    
    # Better approach: Read the file, identify "id: X", subtract 1 from X if X > 0.
    # And delete the block for id: 0.
    
    # Step 1: Remove the text block for ID 0.
    # ID 0 is the regulatory capture report. 
    # Its title is "Regulatory Capture: The Revolving Door".
    
    # Let's read the file to string first.
    # Then use logic to reconstruct.
    
    updated_content = content
    
    # Regex to find id: \d+
    def decrement_match(match):
        val = int(match.group(1))
        return f"id: {val - 1}"
    
    # But first we MUST remove the Regulatory Capture entry.
    # Searching for the specific title to identify the block would be safest.
    
    # Let's try to remove the specific block first.
    # The user said "Regulatory Capture".
    
    # I'll rely on the structure:
    # {
    #     id: 0,
    #     title: "Regulatory Capture: The Revolving Door",
    #     ...
    # },
    
    # We can match this block roughly.
    pattern_remove = r'\s*{\s*id: 0,\s*title: "Regulatory Capture: The Revolving Door".*?},\s*'
    
    # Note: re.DOTALL is needed.
    updated_content = re.sub(pattern_remove, '', updated_content, count=1, flags=re.DOTALL)
    
    # Now decrement all remaining ids.
    # "id: 1" -> "id: 0"
    # "id: 2" -> "id: 1"
    
    # We need to be careful about not replacing things like "id: 10" becoming "id: 00" if we naively replace "1".
    # Use a function.
    
    def decrement_id(match):
        val = int(match.group(1))
        # We only decrement if it was > 0 originally (which they all should be now, assuming id 0 was deleted)
        # But wait, if I deleted id 0, the next is id 1.
        return f"id: {val - 1}"
    
    updated_content = re.sub(r'id: (\d+)', decrement_id, updated_content)
    
    with open(input_file, 'w') as f:
        f.write(updated_content)
        
    print("Successfully deleted Regulatory Capture and re-indexed reports.")

if __name__ == "__main__":
    delete_report_id_0()
