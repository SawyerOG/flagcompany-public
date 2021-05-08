import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ScheduledJob, ScheduledMonthly } from '../../../Config/Interfaces';

import { Spinner } from '../../../Components/Loaders/Loaders';
import { Button } from '../../../Components/Button';

const Container = styled.div`
    position: absolute;
    height: 90vh;
    width: 90vw;
    top: 5vh;
    left: 5vw;
    border-radius: 5px;
    background: #fff;
    padding: 10px;
    z-index: 101;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 100vw;
    background-color: #383838;
    opacity: 0.8;
    z-index: 100;
`;

const MapBody = styled.div`
    height: 90%;
    width: 100%;
`;

const Iframe = styled.iframe`
    height: 100%;
    width: 100%;
`;

interface Props {
    jobs: (ScheduledJob | ScheduledMonthly)[];
    close: () => void;
}

const homebase = '3995+W+73rd+Ave+Westminster+CO+80030';

const Modal: React.FC<Props> = ({ jobs, close }) => {
    const [addresses, setAddresses] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (addresses.length === 0) {
            setLoading(true);
            const arr: string[] = [];

            jobs.forEach(job => {
                arr.push(
                    job.addr.address.split(',').join('').split(' ').join('+')
                );
            });
            setAddresses(arr);
            setLoading(false);
        }
    }, [addresses.length, jobs]);
    return (
        <>
            <Backdrop />
            <Container>
                <MapBody>
                    {!loading && addresses.length > 0 && (
                        <Iframe
                            title="Route Map"
                            src={`https://www.google.com/maps/embed/v1/directions?key=${
                                process.env.REACT_APP_GKEY
                            }&origin=${homebase}&destination=${homebase}&waypoints=${addresses.join(
                                '|'
                            )}&mode=driving&zoom=10&avoid=tolls`}
                        ></Iframe>
                    )}
                    {loading && <Spinner />}
                </MapBody>
                <Button
                    color="blue"
                    type="button"
                    height={50}
                    width={100}
                    click={close}
                >close</Button>
            </Container>
        </>
    );
};

export default Modal;
