// Yahan apna Telegram Bot Token aur Chat ID daliye
const TELEGRAM_BOT_TOKEN = '7514184930:AAEEIVlhfaOwFTAMWtzcNJmSafu6AHOdwiI';
const TELEGRAM_CHAT_ID = '7514184930';

const form = document.getElementById('registrationForm');
const messageDiv = document.getElementById('message');
const submitBtn = form.querySelector('.submit-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Form data collect karo
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        course: document.getElementById('course').value,
        year: document.getElementById('year').value
    };
    
    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '';
    
    // Telegram message format
    const message = `
🎓 *New Student Registration*

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}
📚 *Course:* ${formData.course}
📅 *Year:* ${formData.year}

⏰ *Time:* ${new Date().toLocaleString('hi-IN')}
    `;
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${7514184930:AAEEIVlhfaOwFTAMWtzcNJmSafu6AHOdwiI}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: 7514184930,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            showMessage('✅ Registration successful! Data Telegram pe send ho gaya hai.', 'success');
            form.reset();
        } else {
            throw new Error('Telegram API error');
        }
    } catch (error) {
        showMessage('❌ Error! Kripya apna internet connection check kariye.', 'error');
        console.error('Error:', error);
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = '<span>Submit Registration</span> ✈️';
    }
});

function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = `message ${type}`;
    
    setTimeout(() => {
        messageDiv.className = 'message';
    }, 5000);
}
