import React, { useState } from 'react';
import MagneticButton from './MagneticButton';
import { useTechnoSounds } from '../hooks/useTechnoSounds';

export default function ContactForm() {
    const [status, setStatus] = useState('');
    const { playClick } = useTechnoSounds();

    const handleSubmit = async (e) => {
        e.preventDefault();
        playClick();
        setStatus('Отправка...');
        const formData = new FormData(e.target);
        formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // TODO: User needs to insert key from Web3Forms

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus('Сообщение успешно отправлено!');
                e.target.reset();
            } else {
                console.log("Error", data);
                setStatus('Произошла ошибка при отправке.');
            }
        } catch (error) {
            setStatus('Ошибка сети.');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{
            display: 'flex', flexDirection: 'column', gap: '1rem', 
            background: 'var(--glass-bg)', padding: '2rem', 
            borderRadius: '24px', border: '1px solid var(--glass-border)',
            maxWidth: '500px', margin: '2rem auto 0',
            textAlign: 'left'
        }}>
            <h3 style={{fontFamily: 'var(--font-heading)', color: 'var(--accent)', marginBottom: '0.5rem'}}>Написать мне напрямую</h3>
            
            <label style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Ваше имя</label>
            <input type="text" name="name" required style={{
                padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid var(--glass-border)',
                background: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none'
            }}/>

            <label style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Email для связи</label>
            <input type="email" name="email" required style={{
                padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid var(--glass-border)',
                background: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none'
            }}/>

            <label style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>Сообщение</label>
            <textarea name="message" required rows="4" style={{
                padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid var(--glass-border)',
                background: 'rgba(0,0,0,0.3)', color: '#fff', outline: 'none', resize: 'vertical'
            }}></textarea>

            <MagneticButton>
                <button type="submit" className="btn btn-primary" style={{marginTop: '1rem', width: '100%'}}>
                    {status || 'Отправить сообщение'}
                </button>
            </MagneticButton>
        </form>
    );
}
