import urllib.request

with open('request.json', 'r') as requestFile:
    data=requestFile.read()
    data = data.encode('utf-8')
url = 'http://PhantomJScloud.com/api/browser/v2/a-demo-key-with-low-quota-per-ip-address/'
headers = {'content-type':'application/json'}
req = urllib.request.Request(url, data, headers)
response = urllib.request.urlopen(req)
results = response.read()
# you can uncomment the code below & use it for debugging
"""
print('\nresponse status code',response.code)
print('\nresponse headers (pay attention to pjsc-* headers)')
print(response.headers)
"""
with open('content.jpg', 'wb') as responseFile:
	responseFile.write(results)
