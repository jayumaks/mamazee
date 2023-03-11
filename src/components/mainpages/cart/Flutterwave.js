import React from 'react';
import { useFlutterwave, FlutterWaveButton } from 'react-flutterwave';

export default function App({ data, total, tranSuccess }) {
    const { email, name } = data
    const config = {
        public_key: "FLWPUBK-b37ec90a2b0db0d6cfd5ea0d6c22fa08-X",
        tx_ref: Date.now(),
        amount: total,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: email,
            phonenumber: '08102909304',
            name: name,
        },
        customizations: {
            title: 'Mamazee Wears',
            description: 'Payment for items in cart',
            logo: 'https://assets.piedpiper.com/logo.png',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    const fwConfig = {
        ...config,
        // text: 'Pay with Flutterwave!',
        callback: (response) => {
            console.log(response);
        },
        onClose: () => { },
    };

    return (
        <div>
            <button
                // style={{
                //     backgroundColor: "red",
                //     color: '#fff',
                //     padding: "10px",
                //     cursor: "pointer"
                // }}
                onClick={() => {
                    handleFlutterPayment({
                        callback: (response) => {
                            console.log(response);
                        },
                        onClose: () => { },
                    });
                }}
            >
                Make Payment
      </button>

            <FlutterWaveButton {...fwConfig} />
        </div>
    );
}