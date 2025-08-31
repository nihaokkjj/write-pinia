export function addSubscription(subscriptions, callback) {
    subscriptions.push(callback)//将回调函数放在数组中

    const removeSubscription = () => {
       const idx = subscriptions.indexOf(callback)
       if(idx > -1) {
        subscriptions.splice(idx, 1)
       }
    }
    return removeSubscription
}

export function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach(cb=>cb(...args))
}