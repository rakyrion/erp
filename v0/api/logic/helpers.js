function printRows(doc, products, initY, columnPositions){
    
    let _positionY = initY
    products.forEach((product, index) => {
        if(index !== 0) _positionY += 20
        row(doc,_positionY)
    })
    _positionY += 20
    row(doc,_positionY)
    for(let i = 0; i < 5 ;i++){
        column(doc, columnPositions[i], initY, _positionY+20)
    }

}

function row(doc, heigth) {
    doc.lineJoin('miter')
        .rect(30, heigth, 500, 20)
        .stroke()
    return doc
}

function column(doc, positionX, startY, endY){
    doc.lineCap('butt')
    doc.moveTo(positionX, startY)
    doc.lineTo(positionX, endY)
    doc.stroke()
    return doc
}


function writeTitlesOnHeaders(doc, titles, positionsX, positionY){
    
    titles.forEach((title, index) => {
        return setHeaderTitle(doc, title, positionsX[index], positionY)
    });
}

function setHeaderTitle(doc, title, positionX, positionY){
    doc.x = positionX
    doc.y = positionY
    doc.text(title, {
        paragraphGap: 5,
        indent: 5,
        align: 'justify',
        columns: 1
    })
   return doc
}

function writeProductsOnCells(doc, products, positionsX, positionY){
    let _positionY = positionY
    products.forEach((product, index) => {
        
        if(index !== 0) _positionY += 20
        const {name, description, amount, price, tax, total} = product
    
        printCell(doc, name, positionsX[0], _positionY )
        printCell(doc, description, positionsX[1], _positionY )
        printCell(doc, amount, positionsX[2], _positionY )
        printCell(doc, `${price} €`, positionsX[3], _positionY )
        printCell(doc, `${tax} %`, positionsX[4], _positionY )
        printCell(doc, `${total} €`, positionsX[5], _positionY )
    })
    
}

function printCell(doc, text, positionX, positionY ){
    doc.x = positionX
    doc.y = positionY
    doc.text(text, {
        paragraphGap: 5,
        indent: 5,
        align: 'justify',
        columns: 1
    })
    return doc
}

function writeInvoiceResume(doc, products, positionX, initY){
    let subtotal = 0
    let total = 0
    let taxable = 0
    let positionY = initY
    products.forEach(product => {
        subtotal += (product.amount * product.price)
        taxable += (product.amount * product.price * (product.tax / 100 + 1)) - (product.amount * product.price)
        total += product.total
        positionY += 20
    })
    doc.text(`Subtotal: ${roundTo(subtotal, 2)} €\nTaxable: ${roundTo(taxable, 2)} €\nTotal: ${roundTo(total, 2)} €`, positionX, positionY+30)
    return doc
}

function roundTo(n, digits) {
    if (digits === undefined) {
        digits = 0;
    }

    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    return Math.round(n) / multiplicator;
}

function sanitizeDate(date) {
    let month = date.getMonth() + 1
    if (month < 10) month = '0' + month

    let day = date.getDay()
    if (day < 10) day = '0' + day
    let year = date.getFullYear()

    return year + '-' + month + '-' + day
}

module.exports = {
    printRows,
    writeProductsOnCells,
    writeTitlesOnHeaders,
    writeInvoiceResume,
    sanitizeDate
}