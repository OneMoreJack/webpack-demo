class Check{
    moreThan5(num){
        if(num > 5){
            console.log(`yes! ${num} > 5`)
        } else {
            console.log('sorry,too small')
        }
    }
}

export default new Check()

/* export default new class {
    moreThan5(num){
        if(num > 5){
            alert(`yes! ${num} > 5`)
        } else {
            alert('sorry,too small')
        }
    }
}() */