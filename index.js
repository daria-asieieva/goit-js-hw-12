import{a as h,i as g,S as p}from"./assets/vendor-Qob_5Ba8.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const m="46845751-23df18a8b1d1a4c3ff293bf75",b="https://pixabay.com/api/";async function f(s,r=1,t=15){const a=`${b}`;try{const e=await h.get(a,{params:{key:m,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:t}});if(e.data.hits.length===0)throw new Error("No images found");return e.data}catch(e){throw console.error("Error fetching images:",e),e}}function w(s){const r=document.querySelector(".gallery");r&&(r.innerHTML=s.map(t=>`
        <a href="${t.largeImageURL}" class="gallery__link">
            <div class="gallery__item">
                <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
                <div class="gallery__info">
                    <p><b>Likes:</b> ${t.likes}</p>
                    <p><b>Views:</b> ${t.views}</p>
                    <p><b>Comments:</b> ${t.comments}</p>
                    <p><b>Downloads:</b> ${t.downloads}</p>
                </div>
            </div>
        </a>
    `).join(""))}function L(){const s=document.querySelector(".gallery");s&&(s.innerHTML="")}function c(s){g.error({title:"Error",message:s,position:"topRight"})}function d(s){const r=document.querySelector(".loader");r&&(r.style.display=s?"block":"none")}document.addEventListener("DOMContentLoaded",()=>{const s=document.querySelector(".search-form"),r=document.querySelector(".load-more"),t=new p(".gallery a");let a=1,e="";const o=15,l=()=>r.style.display="none",u=()=>r.style.display="block";s.addEventListener("submit",async n=>{if(n.preventDefault(),e=n.currentTarget.elements.searchQuery.value.trim(),e===""){c("Please enter a search query");return}L(),d(!0),l(),a=1;try{const i=await f(e,a,o);!i.hits||i.hits.length===0?c("Sorry, there are no images matching your search query. Please try again!"):(w(i.hits),t.refresh(),i.totalHits>o&&u())}catch{c("An error occurred while fetching images. Please try again later.")}finally{d(!1)}}),r.addEventListener("click",async()=>{a+=1,d(!0),l();try{const n=await f(e,a,o);if(n.hits&&n.hits.length>0)if(v(n.hits),t.refresh(),a*o>=n.totalHits)c("We're sorry, but you've reached the end of search results.");else{u();const{height:y}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:y*2,behavior:"smooth"})}else c("We're sorry, but you've reached the end of search results.")}catch{c("An error occurred while loading more images. Please try again.")}finally{d(!1)}})});function v(s){const r=document.querySelector(".gallery");r&&r.insertAdjacentHTML("beforeend",s.map(t=>`
            <a href="${t.largeImageURL}" class="gallery__link">
                <div class="gallery__item">
                    <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />
                    <div class="gallery__info">
                        <p><b>Likes:</b> ${t.likes}</p>
                        <p><b>Views:</b> ${t.views}</p>
                        <p><b>Comments:</b> ${t.comments}</p>
                        <p><b>Downloads:</b> ${t.downloads}</p>
                    </div>
                </div>
            </a>
        `).join(""))}
//# sourceMappingURL=index.js.map
