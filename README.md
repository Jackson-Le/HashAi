# HASH.AI Project files for our project HashMap

Project worked on by HASH.AI Berkeley team for Data-X for Fall 2020.

- Anton Bosneaga - antonbosneaga@berkeley.edu
- Jackson Le - jacksonle@gmail.com
- Malo Le Magueresse - malo_le_magueresse@berkeley.edu
- Peter Zhu - peterzhu@berkeley.edu

# What's in this repo?

### 2 IPython Notebooks
  - for analysis of household statistics in Berkeley (Poisson Process discovery)
  - for web scraping key locations from Yelp in Berkeley (Store / House locations for delivery)
### 2 Simulations
  - for intersection to intersection car interactions
  - for larger scale delivery routings in city of Berkeley
  
  Additional instructions on how to run can be found in their README folders.

# Links

Please use the following link for the website:
http://hashaiproject.pythonanywhere.com/

Please use the following link for the large scale delivery simulation:
https://core.hash.ai/@jacksonle/demandtest_end/main

Please use the following link for the intersection simulation:
https://core.hash.ai/@mlm5/intersection-data-x/main

Please check out our news release here:
https://docs.google.com/document/d/e/2PACX-1vTLZXseiFM7tj_tnSY-vL8N2k3irDRTSqwzvapx51YUMizZS6UR5-f-nPptztD4gX5VgM--lDFkLTjR/pub

Please check out our presentation here: https://docs.google.com/presentation/d/1vNdAFJx5t_iM4446ipskURUgg3PDKBB9OMs3CCBuf4k/edit?usp=sharing

Website files: https://drive.google.com/file/d/1YOGSb5vm_1kcioGTqZd5DnjahvTiOhSr/view?usp=sharing

# Project Overview, Problem, Solution, Learning Process

We started this semester learning about the HASH.ai engine and what it offers. In summary, HASH.ai is a simulation platform for modeling complex behaviors of agents for use cases like predicting the spread of COVID19 in a city to visualizing the movement of Amazon's products in its warehouse. After some brainstorming within our 4 person team, we decided that we wanted to focus our efforts on a traffic simulation on two granularities: intersection to intersection and large scale delivery routing. These two simulation codes are detailed in the folders in this repository.

As a team, we decided to focus on this issue due to its potential impact on the day to day lives of people's need for transportation. Even within our team, the commutes that we take within the Bay Area often are miserable, and the prediction power of apps like Google Maps and Waze (as we have personally experienced) are very inaccurate at times. The problem of traffic is that it is complex too: so many agents and factors like foggy weather, holiday shopping, collsions, jay walkers, slow buses, and special events change the dynamics of what we experience while driving on the road. Given the personal need for better predictive power in traffic ETAs, the promise of simulation based decision making, and the potential to disrupt the mapping industry with this new, forward-thinking, probabilistic approach to traffic, the four of us set out on this semester long project with this goal in mind.

The concept of simulation based traffic prediction with HASH.ai is that all the factors that affect traffic can be modeled as random events with some poisson process, and these agent generated behaviors will interact with each other, just like cars, traffic lights, and jaywalkers do in the real world. Simulation accounts for all the small and intricate complexities within traffic modeling, and it produces accurate results at decently low computational costs. In addition to prediction, simulation provides a means to test new ideas in traffic engineering or navigation systems without changing the status quo. For example, if a particular intersection wanted to increase its green light time for some traffic flow direction to optimize traffic flow without actually testing it in real life, then simulation would be an invaluable tool to do that. The need for simulation is apparent, and thus our goal was to build a traffic simulation sandbox which provides a low cost and efficient method to model the complex real world traffic - with the hope that in the future, this system could power a next generation navigation app.

Meet HashMap, our simulation-driven traffic predictor which can generate accurate traffic predictions by simulating individual traffic participants and tracking their complex interactions. Our users can choose an area of interest to see how traffic conditions will evolve based on current real-time data and simulated outcomes. The app periodically checks-in with the source of real-time traffic data to adjust its predictions (at the moment that’s the MapBox API). Other random processes are modeled by a poisson distribution and have differing levels of impact on each agent’s behavior. Our key destinations, like houses or grocery stores are found via web scraping Yelp and using census data to drive model behaviors. Navigation is programmed into each agent as the delivery trucks are dispatched from grocery stores and routed to homes with a fixed size of delivery materials. Our solution is currently only modeling the city of Berkeley, but can be easily adapted for any other location.

The simulation we run produces a lot of data, and that helps us understand what is going on in our simulated world and derive insights for different types of users and use cases. First, for road users, who may want to know what the traffic looks like in a particular area, we can get information on the evolution of traffic conditions by the time they arrive to a target location. For this use case, knowing the number of cars on a section of roadway and their average speed can be critical for efficient navigation. With some computation, it can also give us the user its ETA. For businesses, and for instance delivery platforms, the simulation can provide additional information on the real-time demand for their product, as well as the rate at which this demand is met. The simulation can be used to test hypotheses about the delivery system like demand and delivery patterns, or the impact of signing new partnerships in a particular area, or increasing and decreasing their drivers pool.

In the course of this project we have had to traverse a complicated technical landscape. It was both challenging and exciting from a tech-stack point of view, but also allowed us to arrive at a unique final product. Early on in the project we adopted a new technology, the Hash.ai simulation engine. This tech stack is entirely outside our class’s curriculum. The agile development process did end up speeding up our development timeline through parallel workloads being assigned to different members of our group. Out tech stack involves Javascript, Python, and Django to build a web app, webscraping and processing data with BeaitfulSoup and python, and Pandas for census data gathering and analysis.

Some future steps that we have thought of implementing in our Hash.Ai model are: (1) adapting the backend of HashAi for computations off the cloud, as many of the API features in Hash is shared with other users, which can impact the speed of our simulations, (2) porting the heavier computational load off their servers could decrease this variability and provide for a more streamlined experience, (3) implementing routing with a main agent simulating the user of our app. This will allow us to compete with other navigation applications and to provide a different approach to routing, (4) fleshing out our agents with more motivations, such as average acceleration speeds and their distribution or the likelihood of accidents occuring, will give us more accurate simulations of a city’s traffic, (5) adding new agents and behaviors to the simulation, to replicate car traffic as realistically as possible, (6)  exploring other industries or applications for this tool, like to determine optimal traffic light policy in real time, or to compute real-time ETAs for supply chains, and (7) building iOS and Android apps to expand our reach to regular consumers. 

Overall, as a team, we learned a lot about the space of simulation, explored a new tech stack, built a traffic simulator with venture application potential, and really got to know each other well over the semester. The project, experience gained, as well as connections made are well beyond just the learning done in this class, and we are super excited about this final project we have put together.

Again, thanks so much for reading through this, and please check out our website at http://hashaiproject.pythonanywhere.com/


The HASH.ai Data-X Fall2020 team
