import unirest
import json 
import sys
# from subprocess import call

# to use the above libraries just install unirest
#		"pip install unirest"
# 		only for python2.7
#

# edit the text below to find its positivity and negitivity.
text = sys.argv[1]
# angry -0.99774768  
# sad -0.97837309
# happy 0.941875182
# afraid -0.835750404
response = unirest.post("https://twinword-sentiment-analysis.p.mashape.com/analyze/",
  headers={
    "X-Mashape-Key": "BGiZHzpPe9msh3McfYhvWmYU1WLGp1FgBPKjsnvbikKvLC0IDw",
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json"
  },
  params={
    "text": text
  }
)

y = json.dumps(response.body)
x = json.loads(y)

print("Json-response : \n\n"+str(response.body))
print("\ntext : "+text)
print("type : "+x["type"])
print("Score : "+str(x["score"]))
print("Keywords : ")
for i in x["keywords"]:
	print("\n\t"+i["word"]+" : "+str(i["score"]))
if x["score"]>=0.50 :
	print "+ve"
	fo = open("foo.json", "w")
	#position = fo.seek(0, 0);
	fo.write( '{"score":'+str(x["score"])+","+'"key":'+'"rock"'+"}" )
	fo.close()

	fo = open("foo.json", "r")
	#position = fo.seek(0, 0);
	str=fo.read()
	print str
	fo.close()
elif x["score"]<=-0.70 :
	print "-ve"	
	fo = open("foo.json", "w")
	#position = fo.seek(0, 0);
	fo.write( '{"score":'+str(x["score"])+","+'"key":'+'"uplifting"'+"}" )
	fo.close()

	fo = open("foo.json", "r")
	#position = fo.seek(0, 0);
	str=fo.read()
	print str
	fo.close()
elif 0>x["score"]>-0.70 :
	print "-ve"	
	fo = open("foo.json", "w")
	#position = fo.seek(0, 0);
	fo.write( '{"score":'+str(x["score"])+","+'"key":'+'"romantic"'+"}" )
	fo.close()

	fo = open("foo.json", "r")
	#position = fo.seek(0, 0);
	str=fo.read()
	print str
	fo.close()
elif 0<=x["score"]<0.50 :
	print "-ve"	
	fo = open("foo.json", "w")
	#position = fo.seek(0, 0);
	fo.write( '{"score":'+str(x["score"])+","+'"key":'+'"pop"'+"}" )
	fo.close()

	fo = open("foo.json", "r")
	#position = fo.seek(0, 0);
	str=fo.read()
	print str
	fo.close()
# call(["python", "-m","SimpleHTTPServer","3000"])

