// Career / Jobs article source loader
// Loads the Career / Jobs articles and merges them into the global posts array.
document.addEventListener("DOMContentLoaded",()=>{
  const script=document.createElement("script");
  script.src="career-jobs.js";
  script.onload=()=>{
    if(typeof window.careerJobsPosts!=="undefined" && Array.isArray(window.careerJobsPosts)){
      window.posts=Array.isArray(window.posts)?window.posts.concat(window.careerJobsPosts):window.careerJobsPosts;
    }
  };
  document.head.appendChild(script);
});
