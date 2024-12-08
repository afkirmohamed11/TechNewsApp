document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    const size = 32; // Standard favicon size
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = '/technews.jpg';
    
    img.onload = function() {
        // Create circular clipping path
        ctx.beginPath();
        ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        // Draw the image
        ctx.drawImage(img, 0, 0, size, size);

        // Update favicon
        const link = document.querySelector("link[rel*='icon']");
        link.href = canvas.toDataURL();
    };
});
