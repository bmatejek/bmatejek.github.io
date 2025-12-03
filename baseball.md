---
layout: default
title: Baseball
permalink: /baseball/
stylesheet: /assets/css/baseball.css
script: /assets/javascript/baseball.js
---

<div class="baseball-header">
  <div id="baseball-discussion-frame">
    <div id="baseball-discussion">
      One of my travel goals is to attend at least one game at every current Major League Baseball stadium. 
      Over the last decade, I have planned several vacations to cities nationwide to expand my list of visited stadiums. 
      My brother Rob, our buddy Joe, and my Dad are frequent travel partners on these expeditions. 
      I have attended games at 26 different stadiums, missing only Arizona, Texas, Chicago (White Sox), and Kansas City. 
      I hope to visit these remaining four stadiums in the coming few years. 
      My favorite stadiums (outside of the home favorite, Citi Field) are PNC Park (PIT), AT&T Park (SF), and Coors Field (DEN). 
      Each one of these stadiums combines modern amenities with spectacular views of the city and the surrounding environment. 
      Denver gets a special shoutout for "The Rooftop" bar that provides excellent views of the game and the Rocky Mountains in the distance.
    </div>
  </div>
  <div class="baseball-photo-frame">
    <img id="baseball-photo" onclick="BaseballPhotoClick();"/>
  </div>
</div>

{% for item in site.data.baseball %}
<div class="baseball-ballpark-element">
    <img src="/assets/images/baseball/stadiums/{{ item.stadium }}.jpg" class="baseball-ballpark"/>
    {% if item.visited %}
        <img src="/assets/images/baseball/logos/{{ item.team }}.png" class="baseball-logo"/>
    {% endif %}
</div>
{% endfor %}

<div class="footer-div"></div>