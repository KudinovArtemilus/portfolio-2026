import React, { useEffect, useRef } from 'react';

const codeSnippets = [
    "@Scheduled(fixedRate = 300)",
    "PLC4XConnector.read(tags)",
    "public interface SensorRepository",
    "TimeSeriesData.builder().build()",
    "RabbitMQ.convertAndSend(pulse)",
    "Platform.runLater(() => updateUI())",
    "new TimeScaleDB.Hypertable()",
    "SpringSecurity.authorizeHttpRequests()",
    "byte[] data = s7.readBytes(0, 1024)",
    "ctx.writeAndFlush(new Response())"
];

function CodeFragments() {
    return (
        <div className="code-fragments">
            {codeSnippets.map((code, i) => (
                <div key={i} className={`code-item code-item-${i}`} style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 10}s`,
                    opacity: 0.15 + Math.random() * 0.15
                }}>
                    {code}
                </div>
            ))}
        </div>
    );
}

function LightningCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const createLightning = (x1, y1, x2, y2, opacity) => {
            const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            const segments = Math.floor(dist / 15);
            
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(0, 242, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);

            for (let i = 1; i <= segments; i++) {
                const proportion = i / segments;
                const targetX = x1 + (x2 - x1) * proportion;
                const targetY = y1 + (y2 - y1) * proportion;
                
                const offsetX = (Math.random() - 0.5) * 15;
                const offsetY = (Math.random() - 0.5) * 15;
                
                const curX = i === segments ? x2 : targetX + offsetX;
                const curY = i === segments ? y2 : targetY + offsetY;
                
                ctx.lineTo(curX, curY);

                if (Math.random() > 0.98 && i < segments) {
                    createLightning(curX, curY, curX + (Math.random() - 0.5) * 40, curY + Math.random() * 40, opacity * 0.4);
                }
            }
            ctx.stroke();
            
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.stroke();
        };

        let lightningStrikes = [];

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'lighter';
            
            if (Math.random() > 0.985) {
                const x1 = Math.random() * canvas.width;
                const y1 = Math.random() * canvas.height;
                lightningStrikes.push({
                    x1, y1,
                    x2: x1 + (Math.random() - 0.5) * 250,
                    y2: y1 + (Math.random() - 0.5) * 250,
                    life: 1.0,
                    decay: 0.1 + Math.random() * 0.1
                });
            }

            lightningStrikes = lightningStrikes.filter(s => {
                s.life -= s.decay;
                if (s.life > 0) {
                    createLightning(s.x1, s.y1, s.x2, s.y2, s.life);
                    return true;
                }
                return false;
            });

            animationFrameId = requestAnimationFrame(update);
        };

        update();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="lightning-canvas" />;
}

export default function TechnoBackground() {
    return (
        <div className="techno-bg">
            <div className="grid-overlay"></div>
            <div className="bg-orbs">
                <div className="bg-orb orb-1"></div>
                <div className="bg-orb orb-2"></div>
            </div>
            <CodeFragments />
            <LightningCanvas />
            <svg className="circuit-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path className="line-path" d="M0,20 L40,20 L40,40 L60,40 L60,0 M20,0 L20,100 M80,0 L80,30 L100,30 M0,80 L70,80 L70,100 M30,40 L30,60 L50,60 L50,100" stroke="var(--accent)" strokeWidth="0.05" fill="none" opacity="0.15" />
            </svg>
        </div>
    );
}
