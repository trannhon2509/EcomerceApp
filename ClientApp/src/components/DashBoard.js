import React, { Component } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default class DashBoard extends Component {
    state = {
        productSales: {},
        loading: true,
        error: null,
        selectedDate: new Date().toISOString().slice(0, 10), // Lấy ngày hiện tại dưới dạng YYYY-MM-DD
    };

    componentDidMount() {
        this.fetchProductSales(this.state.selectedDate);
    }

    fetchProductSales(date) {
        axios.get(`api/statis/GetProductSalesByMonth?date=${date}`)
            .then(response => {
                this.setState({
                    productSales: response.data,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                    loading: false,
                });
            });
    }

    handleDateChange = (event) => {
        const date = event.target.value;
        this.setState({
            selectedDate: date,
            loading: true,
        });
        this.fetchProductSales(date);
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render() {
        const { productSales, loading, error, selectedDate } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        const labels = Object.keys(productSales);
        const dataValues = Object.values(productSales);

        const backgroundColors = labels.map(() => this.getRandomColor());
        const borderColors = backgroundColors.map(color => color.replace(/[^,]+(?=\))/, '1')); // Set alpha to 1 for border color

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Quantity Sold',
                    data: dataValues,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Product Sales for Selected Month',
                },
            },
        };

        return (
            <div>
                <h1>DashBoard</h1>
                <div>
                    <label htmlFor="dateInput">Select Date:</label>
                    <input type="date" id="dateInput" value={selectedDate} onChange={this.handleDateChange} />
                </div>
                <Bar data={data} options={options} />
            </div>
        );
    }
}
