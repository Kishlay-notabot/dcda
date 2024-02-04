# dcda  

Devanagari Character Dataset Automation for ML models  
Ongoing research project, more details will be added soon  <br>
Also read [ai.md](https://github.com/Kishlay-notabot/dcda/blob/main/tesseractr/docs/ai.md)

  
---
## Outcomings  

* Legacy version of tessdata is very inaccurate  
  
* Using a single worker to recognize a sample batch of images took 4 minutes and 30 seconds, while using the same sample batch and using 7 workers parallely completed the task in 1 minutes and 10 seconds, which is nearly 75% increase in speed.
But also pointing out from the documentation that the individual recognition speed does not change with multiple workers, its just that the processes get executed parallelly.  
<br>
  
### Issues faced  
[#874](https://github.com/naptha/tesseract.js/issues/874)
[#877](https://github.com/naptha/tesseract.js/issues/877)
[#884](https://github.com/naptha/tesseract.js/issues/884)

    
### Comparison of the confidence values between both versions:

## Sample image:
![sample img](/readme_files/sample.png)

## Legacy Model
![Legacy Model](/readme_files/old.jpeg)

## 4.0/4.1 Model
![Newer Model](/readme_files/newer.jpeg) 



Average confidence of Legacy model is : 79.5  
Average confidence of 4.0/4.1 model is : 89.83 


Now using tesseract.js in react-dev repo
# Credits: 
[Subhrajyoti Dasgupta](https://github.com/subhrajyotidasgupta/DevanagariHTR)
Prashnna Kumar Gyawali[Stanford University]  
Ashok Kumar Pant [Tribhuvan University]  
[Research Paper](https://www.researchgate.net/publication/304406868_Deep_learning_based_large_scale_handwritten_Devanagari_character_recognition)
gImageReader tool on Github





