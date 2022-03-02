import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'

function Home() {

    const [cardNumber, setCardNumber] = useState()
    const [exDate, setExDate] = useState()
    const [validationCode, setValidationCode] = useState()
    const [amount, setAmount] = useState()
    const [submit, setSubmit] = useState(false)
    const [validationForm, setValidationForm] = useState(false)

    const readyBtn = cardNumber && exDate && validationCode && amount

    const host = window.location.origin === 'http://localhost:3000' ? 'http://localhost:3001' : window.location.origin


    function maskCardNumber(value) {
        return value.replace(/[^0-9.]/g, '').match(/.{1,4}/g)?.join(" ").substr(0, 19) || ""
    }

    function maskCardExpirationDate(value) {
        return value.replace(/[^0-9.]/g, '').match(/.{1,4}/g)?.join("/").substr(0, 19) || ""
    }

    function onlyNumber(e) {
        e.target.value = e.target.value.replace(/[^0-9.]/g, '').match(/.{1,3}/g)?.join(" ").substr(0, 19) || ""
    }

    function takeCardNumber(e) {
        e.target.value = maskCardNumber(e.target.value)
        setCardNumber(e.target.value)
    }

    function takeExDate(e) {
        e.target.value = maskCardExpirationDate(e.target.value)
        setExDate(e.target.value)
    }

    function takeValidCode(e) {
        setValidationCode(e.target.value)
    }

    function takeAmount(e) {
        setAmount(e.target.value)
    }

    function formSubmit(e) {
        e.preventDefault()
        if (cardNumber?.length !== 19) return setValidationForm('Card number') // card number must 19 char
        if (exDate?.length !== 7) return setValidationForm('Expiration Date') // expiration Date must 7 char
        if (validationCode?.length !== 3) return setValidationForm('Card Verification Value/Code') // CVV number must 3 char
        if (!amount) return setValidationForm('Amount') // amount must have

        setSubmit(true)
        e.target.reset()
    }

    useEffect(() => {
        if (submit) {
            setSubmit(false)
            setValidationForm()

                ; (async () => {

                    const res = await axios.post(host + '/payment', {
                        cardNumber,
                        exDate,
                        validationCode,
                        amount: amount.split(' ').join('')
                    })

                    if (res.data) {
                        const {card_number, expiration_date, card_verify, amount} = res?.data
                        alert(`Card created: 
                            Card number: ${card_number},
                            Expiration Date: ${expiration_date},
                            CVV: ${card_verify},
                            Amount: ${amount},
                        `)
                    }

                })()
                setCardNumber()
                setExDate()
                setValidationCode()
                setAmount()

        }
    }, [submit, host, cardNumber, exDate, validationCode, amount])


    return (
        <>
            <div className="container">
                <div className="card-container">
                    <p>Payment system</p>
                    <form
                        className='card-form'
                        autoComplete='off'
                        onSubmit={formSubmit}
                    >
                        card number
                        <input
                            inputMode='numeric'
                            onChange={takeCardNumber}
                            placeholder='Card Number'
                            type='tel'
                            maxLength={19}
                            required
                        />
                        expiration date
                        <input
                            onChange={takeExDate}
                            placeholder='Expiration Date'
                            type='text'
                            maxLength={7}
                            required
                        />
                        cvv
                        <input
                            onInput={onlyNumber}
                            onChange={takeValidCode}
                            placeholder='Card Verification Value/Code'
                            type='text'
                            maxLength={3}
                            required
                        />
                        amount
                        <input
                            onInput={onlyNumber}
                            onChange={takeAmount}
                            placeholder='Amount'
                            type='text'
                            required
                        />
                        {validationForm && <>{validationForm} wrong</>}
                        <button className={`btn btn-active`} disabled={!readyBtn}>Submit</button>

                    </form>
                </div>
            </div>
        </>
    )
}


export {
    Home
}