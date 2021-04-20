let vendorData 
const body = document.body
const popup = document.querySelector(".popup-container")
const acceptBtn = document.querySelector(".btn-accept")


function toggleClass(target, className) {
    target.classList.toggle(className)
}

function getVendors() {
    return new Promise(resolve => {
        fetch('https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json')
          .then(response => response.json())
          .then(data => {
              vendorData = data
          }).then(() => {
              resolve('resolved')
          });
    })
}

function showPopup() {
    if(!document.cookie.includes("vendor")) {
        toggleClass(popup, "none")
        toggleClass(body, "no-scroll")
    } else return ''
}

async function listVendors() {
    await getVendors()
    let vendors = Object.values(vendorData.vendors)
    let targetElement = document.querySelector(".vendor-list")
    vendors.forEach(el => {
        let item = document.createElement("li")
        item.innerHTML = `<input type="checkbox" id="${el.id}" name="vendor" value="${el.id}">
        <label for="${el.id}">${el.name}</label>
        <a href="${el.policyUrl}">See policy</a>`
        //item.classList.add(`${el.id}`)
        targetElement.appendChild(item)
    })
}

acceptBtn.addEventListener("click", () => {
    let selected = document.querySelectorAll('input[name="vendor"]:checked')
    selected.forEach(el => {
        let expirationDate = Date.now() + 86400000
        document.cookie = `vendor=${el.value}; expires=${new Date(expirationDate)}; SameSite=Strict`
    })
    toggleClass(popup, "none")
    toggleClass(body, "no-scroll")
})

listVendors()
showPopup()

