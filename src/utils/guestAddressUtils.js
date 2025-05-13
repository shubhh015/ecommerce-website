const GUEST_ADDRESSES_KEY = "guest_addresses";

export function getGuestAddresses() {
    return JSON.parse(localStorage.getItem(GUEST_ADDRESSES_KEY) || "[]");
}

export function saveGuestAddresses(addresses) {
    localStorage.setItem(GUEST_ADDRESSES_KEY, JSON.stringify(addresses));
}

export function addGuestAddress(address) {
    const addresses = getGuestAddresses();
    const newAddress = { ...address, _id: Date.now().toString() };
    addresses.push(newAddress);
    saveGuestAddresses(addresses);
    return addresses;
}
