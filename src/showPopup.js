function showPopup(message, isSuccess = true) {
    const popup = document.createElement('div');
    popup.textContent = message;
    popup.classList.add('popup');
    popup.style.position = 'fixed';
    popup.style.top = '60px';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.backgroundColor = isSuccess ? '#28a745' : '#dc3545';
    popup.style.color = '#ffffff';
    popup.style.padding = '10px';
    popup.style.borderRadius = '4px';
    popup.style.zIndex = '1000';
    popup.style.fontSize = '14px';
    popup.style.textAlign = 'center';
    popup.style.animation = 'fadeout 4s forwards';
    popup.style.animationDelay = '2s';

    document.body.appendChild(popup);

    setTimeout(() => {
        document.body.removeChild(popup);
    }, 6000);
}

export default showPopup;