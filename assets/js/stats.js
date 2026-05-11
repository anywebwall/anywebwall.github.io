// =========================================================
// AnyWebWall - Stats Tracker (Downloads & Likes)
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // Check if the current page has a defined wallpaper ID
    if (typeof window.WALLPAPER_ID === 'undefined') {
        console.warn("Stats.js: window.WALLPAPER_ID is not defined on this page.");
        return;
    }

    const apiBase = "https://bsr-aww-tracker.aryanmewadastudios.workers.dev";
    const fileId = window.WALLPAPER_ID;

    const downloadCount = document.getElementById("stat-downloads");
    const likeCount = document.getElementById("stat-likes");
    const likeBtn = document.getElementById("like-btn");

    // 1. Fetch Initial Stats
    fetch(`${apiBase}/stats/${fileId}`)
        .then(response => response.json())
        .then(data => {
            if (downloadCount) downloadCount.innerText = data.downloads ? data.downloads.toLocaleString() : "0";
            if (likeCount) likeCount.innerText = data.likes ? data.likes.toLocaleString() : "0";
        })
        .catch(err => console.error("Error fetching stats:", err));

    // 2. Handle Like Button Click
    if (likeBtn) {
        likeBtn.addEventListener("click", () => {
            // Check if already liked in this session
            if (likeBtn.classList.contains("liked")) return;

            // Instantly update UI
            likeBtn.classList.add("liked");
            likeBtn.innerHTML = `<img src="../../assets/icons/check.svg" class="btn-icon" alt="Liked" style="filter:none;"> Liked!`;
            
            let currentLikes = parseInt(likeCount.innerText.replace(/,/g, '')) || 0;
            likeCount.innerText = (currentLikes + 1).toLocaleString();

            // Send to server
            fetch(`${apiBase}/like/${fileId}`)
                .catch(err => console.error("Error updating likes:", err));
        });
    }
});

// 3. Smart Download Function (Called directly from HTML button onclick)
window.smartDownload = async function(url, filename, customFileId) {
    const btn = document.getElementById('download-btn');
    const originalContent = btn.innerHTML; 
    const apiBase = "https://bsr-aww-tracker.aryanmewadastudios.workers.dev";
    const targetId = customFileId || window.WALLPAPER_ID;
    
    try {
        btn.innerHTML = `<img src="../../assets/icons/download.svg" class="btn-icon" style="filter:none;"> Processing...`;
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0.7";

        // Register download on server
        if (targetId) {
            fetch(`${apiBase}/download/${targetId}`)
                .then(res => res.json())
                .then(data => {
                    const downloadCount = document.getElementById("stat-downloads");
                    if(downloadCount && data.success && data.downloads) {
                        downloadCount.innerText = data.downloads.toLocaleString();
                    }
                }).catch(e => console.error(e));
        }

        // Direct Download link (Fallback logic provided in test.html)
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.target = "_blank"; // Opens directly
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        btn.innerHTML = `<img src="../../assets/icons/check.svg" class="btn-icon" style="filter:none;"> Downloaded!`;
        setTimeout(() => { 
            btn.innerHTML = originalContent; 
            btn.style.pointerEvents = "auto"; 
            btn.style.opacity = "1"; 
        }, 3000);
        
    } catch (e) {
        console.error("Download Error", e);
        btn.innerHTML = originalContent;
        btn.style.pointerEvents = "auto";
        btn.style.opacity = "1";
    }
}