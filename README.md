# TutorialBank: A Manually-Collected Corpus for Prerequisite Chains, Survey Extraction and Resource Recommendation

A corpus designed to facilitate NLP education and promote research in the areas of generating surveys for scientific topics, prerequisite chains of learning, resource recommendations, among others. Also check out our [search engine](http://aan.how/)!


# Folder Structure:


* /data/  

        - resources.sql -- resource dump with meta-data for our corpus
        - resources.csv -- csv version of the above file
        - taxonomy.csv -- contains the topic taxonomy for our corpus
        - topics_to_resources.csv -- contains the 200 topics separate from the taxonomy and their reading lists
        - images_urls.csv -- contains filtered images from resources
        - prerequisite_topics.csv -- contains the 200 topics above along with their wikipedia page
        - prerequisite_annotations.csv -- prerequisite annotations
                 -- If prereq_relation ==1, then source_topic_id is a prerequisite of target_topic_id 
                 -- both source_topic_id and target_topic_id are foreign keys for prereq_id in prerequisite_topics.csv
        - survey_annotations.csv -- annotations for survey extraction with content cards where a score of -1 means DROP, 
                 and 0-2 is the score as in the paper. (only includes PDF cards)
        - survey_annotations_pdf_and_html.csv -- the same as above, except includes both PDFs and HTML pages.
        - projects.csv -- abstract+title pairs from the  resource recommendation experiments
        - doc2vec/ -- a folder which contains the output recommendations from our Doc2Vec model for 10 title+abstract pairs
        - lda/ -- a folder which contains the output recommendations from our Doc2Vec model for 10 title+abstract pairs
        

* /src/

        - download_all.py -- downloads the corpus, creating folders /data/files and /data/url/
        - get_cards.py -- splits resources into cards for survey extraction, creating the folder /data/cards/
        - kappa.py -- computes inter-annotator agreement scores
        - split-md/ -- folder containing utils for splitting markdown files

* /annotation_process/

        - annotation_guidelines.pdf -- contains guidelines from our annotation process
        - prerequisite_interface.png -- picture of the prerequisite annotation interface
        - survey_extraction_interface.png  -- picture of the survey extraction annotation interface
        - resource_recommendation.png -- picture of our current resource recommendation system



# Usage:


## Download all the resources from the corpus:
# Install lynx (follow [these instructions](https://www.tecmint.com/command-line-web-browsers/) or [these](https://habilis.net/lynxlet/) for OSX).
python src/download_all.py


## Create the cards for survey generation (must be run after downloading resources). For this part you need to go to https://pdfbox.apache.org/download.cgi#18x and download pdfbox-app-1.8.13.jar and place it in the folder /src/
python src/get_cards.py 

## Access command line tool that returns prerequisites/valuable cards/images for a particular topic.
## Get a description of the options:
./interface -h

# Corpus Statistics (at the time of paper submission):

1480 files (non-html pages)          
4184 urls                                                  
5664 all 

pedagogical annotations kappa: 0.69                                                                                           
prerequisite annotations kappa: 0.30                                                                                           
survey annotations kappa: 0.33

# Update (2021-06-14)


As of June 14, 2021 we have 20,000+ resources in our corpus and [search engine](http://aan.how/). 
