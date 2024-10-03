import os
import sys
import re

def search_docs(query):
    docs_dir = './docs'
    results = []

    for root, dirs, files in os.walk(docs_dir):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r') as f:
                    content = f.read()
                    if re.search(query, content, re.IGNORECASE):
                        results.append(file_path)

    return results

if __name__ == "__main__":
    if len(sys.argv) > 1:
        query = sys.argv[1]
        matches = search_docs(query)
        print(f"Found {len(matches)} matching documents:")
        for match in matches:
            print(match)
    else:
        print("Please provide a search query.")