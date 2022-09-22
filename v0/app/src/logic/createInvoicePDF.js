const axios = require('axios').default
const API_URL = process.env.REACT_APP_API_URL


function createInvoicePDF(token, invoiceId) {
    //TODO INPUT VALIDATIONS 
    //TO DOWNLOAD PDF: WE SEND A PIPE FROM API, WITH TYPE APP/PDF, THEN WE SET RESPONSETYPE: BLOB // THEN WE CREATE A NEW BLOB WITH RESPONSE DATA AND CREATE A FAKE LINK ELEMENT TO CLICK AND DOWNLOAD
    return (async () => {
        try {
            const response = await axios.get(`${API_URL}/invoices/pdf/${invoiceId}`,
                {
                    responseType: 'blob',
                    headers:
                        { Authorization: `Bearer ${token}` },
                })

            const { data } = response

            const blob = new Blob([data])
            const uril = URL.createObjectURL(blob)
            var link = document.createElement("a");
            link.href = uril;
            link.download = `INV_${invoiceId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return

        } catch (error) {
            const status = error.response.status
            if (status === 0) throw new Error('No response from server')
            const message = error.response.data.error
            if (status >= 500)
                throw new Error(`Server error (${status})`)
            else if (status >= 400)
                throw new Error(`Client error: ${message}`)
        }
    })()
}

export default createInvoicePDF