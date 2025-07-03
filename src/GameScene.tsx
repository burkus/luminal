import { Canvas } from '@react-three/fiber';
import { Model as Monitor } from '@/models/Monitor';
import { styled } from 'styled-components';
import { useControls } from 'leva';
import { animated, useSpring } from '@react-spring/three';
import { useEffect, useRef } from 'react';
import type { Mesh, RectAreaLight } from 'three';

const StyledCanvas = styled(Canvas)`
  background-color: #000;
`;

const GameScene = () => {
    const monitorRef = useRef<Mesh>(null);
    const areaLightRef = useRef<RectAreaLight>(null);

    useEffect(() => {
        if (areaLightRef.current && monitorRef.current) {
            areaLightRef.current.lookAt(monitorRef.current.position);
        }
    }, [monitorRef, areaLightRef])

    const springs = useSpring({
        from: {
            rotation: [0, 0, 0],
            position: [0, 0, 1]
        },
        to: {
            rotation: [0, Math.PI * 2, 0],
            position: [0, 0, -1]
        },
        config: {
            tension: 10,
            friction: 10,
            mass: 10
        },
    });

    return (
        <StyledCanvas>
            <animated.mesh
                {...springs}
                ref={monitorRef}
            >
                <Monitor
                    scale={[1.5, 1.5, 1.5]}
                />
            </animated.mesh>
            <rectAreaLight
                position={[0, 5, 1]}
                intensity={0.5}
                ref={areaLightRef}
                color={"#fff"}
            />
            <spotLight
                position={[0, 1, 4]}
                intensity={3}
                penumbra={2}
            />
            <ambientLight intensity={0.1} />
        </StyledCanvas>
    );
};

export default GameScene;
