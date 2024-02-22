# <p align="center"> DCDA </p>
<p align="center"> Devanagari Character Dataset Automation </p>
<br>

[हिंदी संस्करण पढ़ने के लिए यहां क्लिक करें](https://github.com/Kishlay-notabot/dcda/?tab=readme-ov-file#hindi-translation)
## What?  
This project is made for automating the process (to an extent) of making curated handwritten datasets for any language. The project focuses on Devanagari but it can be used universally with all the languages compatible with the Tesseract OCR engine.
  
This project is like a self improvization closed loop for the existing OCR technology for Devanagari, by inducing minimal human intervention in the tedious process of dataset creation.

## Why? 
This idea originated due to the absence of large datasets on the internet available for the devanagari script. Because it is the least explored domain in terms of OCR technology [Refer to [ this research paper](https://www.researchgate.net/publication/304406868_Deep_learning_based_large_scale_handwritten_Devanagari_character_recognition)]
### Major role of the existing research paper  
Before starting this project, I conducted thorough research on existing handwritten character datasets for the Devanagari script. And the biggest Dataset I found was the **Devanagari Handwritten Character Dataset**. Upon reading the paper thoroughly and contacting the authors, I was given very valuable suggestions from Professor Prashnna, who was the one of the authors of the currently largest available dataset which contains 92,000 images.
The paper was published in 2015, and that time, the authors collected the data and they had to manually process and crop out the individual characters from the recieved data.   

***My project has eliminated all the physical human intervention and narrowed it down to a remotely accesible webpage, which takes minimal human input in form of just some simple clicks, which help in the concatenation of the dataset.***



## How?
The final project turned out to be drastically different than what it was planned like. This repository contains a pipeline of multiple programs which take input images of pages containing handwritten Hindi text, and perform the following processes in the order:  
1. Pre processing the input images (Grayscale and Binarization if needed)
2. Running word level OCR on them using parallel processing power of 7 workers together and exporting the bounding box data of all the words detected into a json file. (One image can contain thousands of words!)
3. A program which uses the exported json file, and the input images and crops out all the words mentioned in the json file.
4. The fourth step is the website where users can just visit and crop out characters one at a time using the embedded Cropper.js instance, and labelling them using the virtual keyboard and submitting them to the database. (Visualization of the website below)
  
![Proposed Webpage](tesseractr/docs/doc.png)

The website has been finalized, and this will be the last part of the project, and after that, the data collection part will get initiated. [@simplycode](https://github.com/simplycode07/) is working on the backend part, and the website will be public and live after some thorough testing.


The ideation process of this project alone was months long and many versions were created and scraped, I would not cover those in this readme because it already is very long :'-)
# Outcomes, findings, problems and achievements gained during the process:
### What did I learn? 
* Pytesseract's introduction  
* React.js [New skill!]  
* Tesseract.js [New skill!]  
* Cropper.js [New skill!]  
* Introduction to existing OCR technologies and softwares like gImageReader, EasyOCR etc. (Tried every existing technology to get desired results, but ended up making it from scratch)



* Legacy version of tessdata is very inaccurate  
  
* Using a single worker to recognize a sample batch of images took 4 minutes and 30 seconds, while using the same sample batch and using 7 workers parallely completed the task in 1 minutes and 10 seconds, which is nearly 75% increase in speed.
But also pointing out from the documentation that the individual recognition speed does not change with multiple workers, its just that the processes get executed parallelly.  
<br>
  
Also read [ai.md](https://github.com/Kishlay-notabot/dcda/blob/main/tesseractr/docs/ai.md)
## Issues faced  
[#874](https://github.com/naptha/tesseract.js/issues/874)
[#877](https://github.com/naptha/tesseract.js/issues/877) 
[#884](https://github.com/naptha/tesseract.js/issues/884)
##### React.js
[#6559](https://github.com/TanStack/query/issues/6559) 
#### Cropper.js
[#1138](https://github.com/fengyuanchen/cropperjs/issues/1138)

## Pull requests and active discussions:

[#1140](https://github.com/fengyuanchen/cropperjs/pull/1140) Added example for V2 of Cropper.js  
[#878](https://github.com/naptha/tesseract.js/pull/878) Added a pull request for adding complex examples of bbox data manipulation and output generation.

## Older additions to readme:
### Comparison of the confidence values between both versions:

#### Sample image:
![sample img](/readme_files/sample.png)

#### Legacy Model
![Legacy Model](/readme_files/old.jpeg)

#### 4.0/4.1 Model
![Newer Model](/readme_files/newer.jpeg) 



Average confidence of Legacy model is : 79.5  
Average confidence of 4.0/4.1 model is : 89.83 

# Credits: 
* [Subhrajyoti Dasgupta](https://github.com/subhrajyotidasgupta/DevanagariHTR)  
* Prashnna Kumar Gyawali [Stanford University]  
* [The mentioned research paper](https://www.researchgate.net/publication/304406868_Deep_learning_based_large_scale_handwritten_Devanagari_character_recognition)
* [@simplycode](https://github.com/simplycode07/)


<br>


# Hindi translation:
## <p align="center"> देवनागरी अक्षर डेटासेट स्वचालितीकरण</p>

## क्या?  
यह परियोजना किसी भी भाषा के लिए संरचित है और हस्तलेखित डेटासेट बनाने की प्रक्रिया को (एक हद तक) स्वचालित करने के लिए। परियोजना देवनागरी पर ध्यान केंद्रित करती है, लेकिन इसे Tesseract OCR इंजन के साथ संगत सभी भाषाओं के साथ सार्वभौमिक रूप से उपयोग किया जा सकता है।
  
यह परियोजना मौजूदा OCR प्रौद्योगिकी के लिए एक स्व-सुधारित बंद लूप की तरह है, जिसमें डेटासेट निर्माण की थकानपूर्ण प्रक्रिया में मानव हस्तक्षेप को न्यूनतम में ले जाता है।

## क्यों? 
यह विचार की उत्पत्ति इंटरनेट पर उपलब्ध देवनागरी स्क्रिप्ट के लिए बड़े डेटासेट की अनुपस्थिति के कारण हुई थी। क्योंकि इसे OCR प्रौद्योगिकी के दृष्टिकोण से यह सबसे कम अन्वेषित डोमेन है [इस रिसर्च पेपर को देखें](https://www.researchgate.net/publication/304406868_Deep_learning_based_large_scale_handwritten_Devanagari_character_recognition)
### मौजूदा रिसर्च पेपर की प्रमुख भूमिका  
इस परियोजना की शुरुआत से पहले, मैंने देवनागरी स्क्रिप्ट के लिए मौजूदा हस्तलेखित वर्ण डेटासेटों पर व्यापक अनुसंधान किया। और मैंने सबसे बड़ा डेटासेट **देवनागरी हस्तलेखित वर्ण डेटासेट** पाया। उसे ध्यानपूर्वक पढ़ने और लेखकों से संपर्क करने के बाद, मुझे उस समय विशेषज्ञ प्रश्ना से बहुत मूल्यवान सुझाव मिला, जो वर्तमान में सबसे बड़े उपलब्ध डेटासेट के एक लेखक थे जिसमें 92,000 छवियां हैं।  <br> 

पेपर 2015 में प्रकाशित हुआ था, और उस समय लेखकों को शब्दों को मैन्युअल रूप से क्रॉप करना और प्रोसेस करना पड़ा जो बहुत ही कठिन कार्य है 

***मेरे प्रोजेक्ट ने सभी भौतिक मानवीय हस्तक्षेप को समाप्त कर दिया है और इसे दूर से पहुंच योग्य वेबपेज तक सीमित कर दिया है, जो केवल कुछ साधारण क्लिक के रूप में न्यूनतम मानव इनपुट लेता है, जो डेटासेट के संयोजन में मदद करता है।***


## कैसे?
अंतिम परियोजना यह उससे बहुत अलग बना है जो यह योजना थी। इस रिपॉजिटरी में कई कार्यक्रमों की पाइपलाइन है जो हस्तलेखित हिंदी पाठ वाली पृष्ठों की इनपुट छवियों को लेते हैं, और क्रमश: निम्नलिखित प्रक्रिया करते हैं:  
1. इनपुट छवियों का पूर्व प्रसंस्करण (ग्रेस्केल और बाइनराईजेशन यदि आवश्यक है)
2. उन पर सात कार्यकर्ताओं का Parallel processing का उपयोग करके वर्ड स्तर का OCR चलाना और सभी पहचानित शब्दों के बाउंडिंग बॉक्स डेटा को एक json फ़ाइल में निर्यात करना। (एक छवि हजारों शब्दों को समाहित कर सकती है!)
3. एक प्रोग्राम जो निर्यात किए गए json फ़ाइल, और इनपुट छवियों का उपयोग करता है और उन सभी शब्दों को जो ज्यसन फ़ाइल में उल्लिखित है, को क्रॉप करता है।
4. चौथा कदम वेबसाइट है जिसमें उपयोगकर्ता सिर्फ एक बार में एक अक्षर को क्रॉप कर सकते हैं जो एम्बेडेड क्रॉपर.js इंस्टेंस का उपयोग करते हैं, और उन्हें वर्चुअल कीबोर्ड का उपयोग करके लेबल कर सकते हैं और उन्हें डेटाबेस में सबमिट कर सकते हैं। (वेबसाइट का दृश्यन नीचे)
  
![प्रस्तावित वेबपेज](tesseractr/docs/doc.png)

वेबसाइट को अंतिम रूप में निर्धारित किया गया है, और इसके बाद, डेटा संग्रहण भाग प्रारंभ होगा। [@simplycode](https://github.com/simplycode07/) बैकएंड हिस्से पर काम कर रहे हैं, और वेबसाइट को कुछ सौथी जाँच के बाद सार्थक बनाया जाएगा।


इस परियोजना के विचार निर्माण प्रक्रिया ने अकेले महीने तक का समय लिया और कई संस्करण बनाए और कूद गए, मैं इस रेडमी को कवर नहीं करूंगा क्योंकि यह पहले से ही बहुत लंबा है :'-)
# परिणाम, खोज, समस्याएँ और प्राप्तियाँ प्रक्रिया के दौरान:

### मैंने क्या सीखा?
* Pytesseract का परिचय  
* React.js [नई कौशल!]  
* Tesseract.js [नई कौशल!]  
* Cropper.js [नई कौशल!]  
* मौजूदा OCR प्रौद्योगिकियों और सॉफ़्टवेयर्स का परिचय जैसे gImageReader, EasyOCR आदि। (वांछित परिणाम प्राप्त करने के लिए हर मौजूदा प्रौद्योगिकी की कोशिश की, लेकिन अंत में स्क्रैच से बना दिया गया है)



* tessdata का लेगेसी संस्करण बहुत अक्षरशास्त्र में अशुद्ध है  
  
* एकल कार्यकर्ता का उपयोग करके एक सैम्पल बैच की छवियों को पहचानने में 4 मिनट और 30 सेकंड लगे, जबकि एक ही सैम्पल बैच का उपयोग करके और सात कार्यकर्ताओं का उपयोग करके कार्यक्रम ने कार्य को 1 मिनट और 10 सेकंड में पूरा किया, जो लगभग 75% की वृद्धि है।
लेकिन उन्होंने दस्तावेज से साबित किया है कि एकल पहचान की गति कई कार्यकर्ताओं के साथ नहीं बदलती है, बल्कि केवल प्रक्रियाएँ पार्लल रूप में कार्य करती हैं।  
<br>

