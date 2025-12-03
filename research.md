---
layout: default
title: Research
permalink: /research/
stylesheet: /assets/css/research.css
---

<div class="research-type-header">
    Invited Talks and Presentations, Oral Exams, and Defenses
</div>
{% for item in site.data.research.presentations %}
<div class="research-div">
    {% if item.teaser %}
    <img class="research-teaser-image" src="/assets/images/research/presentations/{{ item.teaser }}.png"/>
    {% endif %}
    <div class="research-information-wrapper">
        <div class="research-title">{{ item.title }}</div> 
        <div class="research-venue">{{ item.venue }} at <i>{{ item.location }}</i>, {{ item.date }}</div>
        <div class="research-links">
            {% if item.slides %} 
                <a href="/assets/pdfs/research/presentations/{{ item.teaser }}.pdf" target="_blank">Slides</a>
            {% endif %}
            {% if item.poster %} 
                <a href="/assets/pdfs/research/presentations/{{ item.teaser }}_poster.pdf" target="_blank">Poster</a>
            {% endif %}
        </div>
    </div>
</div>
{% endfor %}

<div class="research-type-header">
    Journal and Conference Publications
</div>

{% for item in site.data.research.publications %}
<div class="research-div">
    {% if item.teaser %}
    <img class="research-teaser-image" src="/assets/images/research/publications/{{ item.teaser }}.png"/>
    {% endif %}
    <div class="research-information-wrapper">
        <div class="research-title">{{ item.title }}</div>
        <div class="research-authors">{{ item.authors | replace: "Brian Matejek", "<strong>Brian Matejek</strong>" }}</div>
        <div class="research-venue"><i>{{ item.venue }}</i>, {{ item.year }}.</div>
        <div class="research-links">
            {% if item.paper %} 
                <a href="/assets/pdfs/research/publications/{{ item.teaser }}.pdf" target="_blank">Paper</a>
            {% endif %}
            {% if item.appendix %}
                <a href="/assets/pdfs/research/publications/{{ item.teaser }}_appendix.pdf" target="_blank">Appendix</a>
            {% endif %}
            {% if item.supplemental %}
                <a href="/assets/pdfs/research/publications/{{ item.teaser }}_supplemental.pdf" target="_blank">Supplemental</a>
            {% endif %}
            {% if item.poster %}
                <a href="/assets/pdfs/research/publications/{{ item.teaser }}_poster.pdf" target="_blank">Poster</a>
            {% endif %}
            {% if item.video %}
                <a href="{{ item.video }}" target="_blank">Video</a>
            {% endif %}
            {% if item.website %}
                <a href="{{ item.website }}" target="_blank">Website</a>
            {% endif %}
            {% if item.code %}
                <a href="{{ item.code }}" target="_blank">Code</a>
            {% endif %}
        </div>
    </div>
</div>
{% endfor %}

<div class="research-type-header">
    Workshop Papers
</div>
{% for item in site.data.research.workshop_papers %}
<div class="research-div">
    {% if item.teaser %}
    <img class="research-teaser-image" src="/assets/images/research/workshop_papers/{{ item.teaser }}.png"/>
    {% endif %}
    <div class="research-information-wrapper">
        <div class="research-title">{{ item.title }}</div>
        <div class="research-authors">{{ item.authors | replace: "Brian Matejek", "<strong>Brian Matejek</strong>" }}</div>
        <div class="research-venue"><i>{{ item.venue }}</i> at <i>{{ item.location }}</i>, {{ item.year }}.</div>
        <div class="research-links">
            {% if item.paper %} 
                <a href="/assets/pdfs/research/workshop_papers/{{ item.teaser }}.pdf" target="_blank">Paper</a>
            {% endif %}
            {% if item.code %}
                <a href="{{ item.code }}" target="_blank">Code</a>
            {% endif %}
        </div>
    </div>
</div>
{% endfor %}

<div class="research-type-header">
    Independent Research, Written Exams, and Theses
</div>
{% for item in site.data.research.theses %}
<div class="research-div">
    {% if item.teaser %}
    <img class="research-teaser-image" src="/assets/images/research/theses/{{ item.teaser }}.png"/>
    {% endif %}
    <div class="research-information-wrapper">
        <div class="research-title">{{ item.title }}</div> 
        <div class="research-venue">{{ item.venue }} at <i>{{ item.location }}</i>, {{ item.date }}</div>
        <div class="research-links">
            {% if item.paper %} 
                <a href="/assets/pdfs/research/theses/{{ item.teaser }}.pdf" target="_blank">Paper</a>
            {% endif %}
            {% if item.poster %} 
                <a href="/assets/pdfs/research/theses/{{ item.teaser }}_poster.pdf" target="_blank">Poster</a>
            {% endif %}
        </div>
    </div>
</div>
{% endfor %}
<div class="footer-div"></div>