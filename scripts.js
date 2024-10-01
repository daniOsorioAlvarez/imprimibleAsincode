
const productRow = document.querySelector('.products')





// Función para obtener los parámetros de la URL
function getQueryParams() {
    let params = {};
    let queryString = window.location.search.slice(1);
    let pairs = queryString.split('&');
    for (let pair of pairs) {
        let [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
    return params;
}

// Función para formatear números
function formatNumber(num) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(num);
}

// Asignar los valores a los elementos HTML
window.onload = function() {
    let params = getQueryParams();
    
    console.log(params.logotype);
    if (document.getElementById('documentTitle')) document.getElementById('documentTitle').textContent = params.documentNumber;
    if (document.getElementById('documentNumber')) document.getElementById('documentNumber').textContent = params.documentNumber;
    if (document.getElementById('economicActivity')) document.getElementById('economicActivity').textContent = params.economicActivity.replace('<br>', '');
    if (document.getElementById('timeAddedDocument')) document.getElementById('timeAddedDocument').textContent = params.timeAddedDocument;
    if (document.getElementById('expirationDate')) document.getElementById('expirationDate').textContent = params.expirationDate;
    if (document.getElementById('periodicity')) document.getElementById('periodicity').textContent = params.periodicity;
    if (document.getElementById('legalNameEnterprise')) document.getElementById('legalNameEnterprise').textContent = params.legalNameEnterprise.toUpperCase();
    if (document.getElementById('NIT')) document.getElementById('NIT').textContent = params.NIT;
    if (document.getElementById('address')) document.getElementById('address').textContent = params.address.toUpperCase();
    if (document.getElementById('branchEnterprise')) document.getElementById('branchEnterprise').textContent = params.branchEnterprise.toUpperCase();
   // if (document.getElementById('logotype')) document.getElementById('logotype').src = params.logotype;
    if (document.getElementById('customerName')) document.getElementById('customerName').textContent = params.customerName.toUpperCase();
    if (document.getElementById('customerPhone')) document.getElementById('customerPhone').textContent = params.customerPhone;
    if (document.getElementById('customerAddress')) {
document.getElementById('customerAddress').textContent = params.customerAddress !== null && params.customerAddress !== 'null' ? params.customerAddress : 'No especificada';
}
    if (document.getElementById('identificationCustomer')) document.getElementById('identificationCustomer').textContent = params.identificationCustomer;
    if (document.getElementById('subtotal')) document.getElementById('subtotal').textContent = formatNumber(params.subtotal);
    if (document.getElementById('iva')) document.getElementById('iva').textContent = formatNumber(params.iva);
    if (document.getElementById('total')) document.getElementById('total').textContent = formatNumber(params.total);
    if (document.getElementById('documentNumberFooter')) document.getElementById('documentNumberFooter').textContent = params.documentID;
    if (document.getElementById('expeditionTime')) document.getElementById('expeditionTime').textContent = params.expeditionTime;
    if (document.getElementById('softwareInfo')) document.getElementById('softwareInfo').textContent = params.softwareInfo;
    if (document.getElementById('finalNotes')) document.getElementById('finalNotes').textContent = params.finalNotes;
    if (document.getElementById('documentObservation')) document.getElementById('documentObservation').textContent = params.documentObservation;
    if (document.getElementById('socialWebs')) document.getElementById('socialWebs').textContent = params.socialWebs;
    if (document.getElementById('customerEmail')) document.getElementById('customerEmail').textContent = params.customerEmail;
    if (document.getElementById('legalAuth')) document.getElementById('legalAuth').textContent = params.legalAuth;
    if (document.getElementById('cufe')) document.getElementById('cufe').textContent = params.cufe; // Asignar el CUFE
    if (document.getElementById('paymentMethod')) document.getElementById('paymentMethod').textContent = params.paymentMethod; // Asignar forma de pago
    if (document.getElementById('invoiceType')) document.getElementById('invoiceType').textContent = params.invoiceType; // Asignar tipo de factura
    if (document.getElementById('ivaResponsability')) {
document.getElementById('ivaResponsability').textContent = params.ivaResponsability !== null && params.ivaResponsability !== 'null' ? params.ivaResponsability : '';
}
    // Aplicar los colores a las columnas y al texto
    let representationHEX = params.representationHEX || "#181616"; // Color por defecto si no se proporciona
    let colorHEX = params.colorHEX || "#FFFFFF"; // Color por defecto si no se proporciona

    // Verificación de valores HEX
    if(/^#[0-9A-F]{6}$/i.test(representationHEX)) {
        document.querySelectorAll('.table th').forEach(th => {
            th.style.backgroundColor = representationHEX;
        });
    }

    if(/^#[0-9A-F]{6}$/i.test(colorHEX)) {
        document.querySelectorAll('.table td').forEach(td => {
            td.style.color = colorHEX;
        });
    }

    // Asignar los items
    let items;
    try {
        items = JSON.parse(params.items);
        console.log("Items parsed successfully:", items);
    } catch (e) {
        console.error("Error parsing items:", e);
    }
    let itemsContainer = document.getElementById('itemsTable').querySelector('tbody');
    itemsContainer.innerHTML = ''; // Limpiar la tabla antes de añadir nuevos items
    if (items) {
        items.forEach(item => {
            let row = `<tr>
                            <td>${item.name}</td>
                            <td class="text-center">${formatNumber(item.value)}</td>
                            <td class="text-center">${item.quantity}</td>
                            <td class="text-center">${formatNumber(item.impuesto)}</td>
                            <td class="text-center">${item.detail || ''}</td>
                            <td class="text-center">${formatNumber(item.total)}</td>
                        </tr>`;
            itemsContainer.insertAdjacentHTML('beforeend', row);
        });
    }

    // Generar el QR code
    document.getElementById('qrCode').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://asincode.co/`;
}

