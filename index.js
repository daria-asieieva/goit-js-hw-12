import{a as h,i as g,S as p}from"./assets/vendor-Qob_5Ba8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const m="46845751-23df18a8b1d1a4c3ff293bf75",b="https://pixabay.com/api/";async function f(s,t=1,r=15){const n=`${b}`;try{const e=await h.get(n,{params:{key:m,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:r}});if(e.data.hits.length===0)throw new Error("No images found");return e.data}catch(e){throw console.error("Error fetching images:",e),e}}function w(s){const t=document.querySelector(".gallery");t&&(t.innerHTML=s.map(r=>`
        <a href="${r.largeImageURL}" class="gallery__link">
            <div class="gallery__item">
                <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
                <div class="gallery__info">
                    <p><b>Likes:</b> ${r.likes}</p>
                    <p><b>Views:</b> ${r.views}</p>
                    <p><b>Comments:</b> ${r.comments}</p>
                    <p><b>Downloads:</b> ${r.downloads}</p>
                </div>
            </div>
        </a>
    `).join(""))}function L(){const s=document.querySelector(".gallery");s&&(s.innerHTML="")}function c(s){g.error({title:"Error",message:s,position:"topRight"})}function d(s){const t=document.querySelector(".loader");t&&(t.style.display=s?"block":"none")}document.addEventListener("DOMContentLoaded",()=>{const s=document.querySelector(".search-form"),t=document.querySelector(".load-more"),r=new p(".gallery a");let n=1,e="";const o=15,i=()=>t.style.display="none",u=()=>t.style.display="block";s.addEventListener("submit",async a=>{if(a.preventDefault(),e=a.currentTarget.elements.searchQuery.value.trim(),e===""){c("Please enter a search query");return}L(),d(!0),i(),n=1;try{const l=await f(e,n,o);!l.hits||l.hits.length===0?c("Sorry, there are no images matching your search query. Please try again!"):(w(l.hits),r.refresh(),l.totalHits>o&&u())}catch(l){const y=l.response?"An error occurred while fetching images. Please check your connection and try again.":"An error occurred while fetching images. Please try again later.";c(y)}finally{d(!1)}}),t.addEventListener("click",async()=>{n+=1,d(!0),i();try{const a=await f(e,n,o);a.hits&&a.hits.length>0?(v(a.hits),r.refresh(),n*o>=a.totalHits?c("We're sorry, but you've reached the end of search results."):(u(),window.scrollBy({top:document.querySelector(".gallery").lastElementChild.getBoundingClientRect().height*2,behavior:"smooth"}))):c("We're sorry, but you've reached the end of search results.")}catch{c("An error occurred while loading more images. Please try again.")}finally{d(!1)}})});function v(s){const t=document.querySelector(".gallery");t&&t.insertAdjacentHTML("beforeend",s.map(r=>`
            <a href="${r.largeImageURL}" class="gallery__link">
                <div class="gallery__item">
                    <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
                    <div class="gallery__info">
                        <p><b>Likes:</b> ${r.likes}</p>
                        <p><b>Views:</b> ${r.views}</p>
                        <p><b>Comments:</b> ${r.comments}</p>
                        <p><b>Downloads:</b> ${r.downloads}</p>
                    </div>
                </div>
            </a>
        `).join(""))}
//# sourceMappingURL=index.js.map
