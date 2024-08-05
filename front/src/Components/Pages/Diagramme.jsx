import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import '../style/StyleDiag.css';
import { Chart } from "react-google-charts";
import axios from "axios";

const Diagramme = () => {
    const [maxLoyer, setMaxLoyer] = useState("");
    const [minLoyer, setMinLoyer] = useState("");
    const [totalLoyer, setTotalLoyer] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseMaxLoyer = await axios.get("http://localhost:5000/max-loyer");
                const responseMinLoyer = await axios.get("http://localhost:5000/min-loyer");
                const responseTotalLoyer = await axios.get("http://localhost:5000/total-loyer");
                setMaxLoyer(responseMaxLoyer.data);
                setMinLoyer(responseMinLoyer.data);
                setTotalLoyer(responseTotalLoyer.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='wrapper1'>
                <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Type', 'Montant', { role: 'style' }],
                        ['Loyer minimal', minLoyer, '#2286F7'],
                        ['Loyer maximal', maxLoyer, '#EA22F7'],
                        ['Total des loyers', totalLoyer, '#F78322']
                    ]}
                    options={{
                        title: 'Diagramme des loyers',
                        chartArea: { width: '50%' },
                        hAxis: {
                            title: 'Montant',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Type',
                        },
                    }}
                    legendToggle
                />
            </div>
            <div className='wrapper2'>
                <Chart
                    width={'100%'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Type', 'Montant', { role: 'style' }],
                        ['Loyer minimal', minLoyer, 'blue'],
                        ['Loyer maximal', maxLoyer, 'green'],
                        ['Total des loyers', totalLoyer, 'orange']
                    ]}
                    options={{
                        title: 'Diagramme en camembert des loyers',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
        </div>
    );
};


export default Diagramme;
