function participantTemplate(count) {
    return `
    <section class="participant${count} participant-section">
        <p>Participant ${count}</p>
        <div class="item">
            <label for="fname${count}">First Name<span>*</span></label>
            <input id="fname${count}" type="text" name="fname${count}" required/>
        </div>
        <div class="item activities">
            <label for="activity${count}">Activity #<span>*</span></label>
            <input id="activity${count}" type="text" name="activity${count}" required/>
        </div>
        <div class="item">
            <label for="fee${count}">Fee ($)<span>*</span></label>
            <input id="fee${count}" type="number" name="fee${count}" required/>
        </div>
        <div class="item">
            <label for="date${count}">Desired Date<span>*</span></label>
            <input id="date${count}" type="date" name="date${count}" required/>
        </div>
        <div class="item">
            <p>Grade</p>
            <select>
                <option selected value="" disabled selected></option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
            </select>
        </div>
    </section>`;
}

let participantCount = 1;

document.querySelector('#add').addEventListener('click', () => {
    participantCount++;
    const button = document.querySelector('#add');
    button.insertAdjacentHTML('beforebegin', participantTemplate(participantCount));
});

function successTemplate(info) {
    return `
        <h2>Registration Complete!</h2>
        <p>Thank you ${info.name} for registering. You have registered ${info.participants} participants and owe $${info.totalFees} in Fees.</p>
    `;
}

function totalFees() {
    let feeElements = document.querySelectorAll("[id^=fee]");
    feeElements = [...feeElements];
    return feeElements.reduce((total, feeElement) => {
        const fee = Number(feeElement.value) || 0;
        return total + fee;
    }, 0);
}

function submitForm(event) {
    event.preventDefault();
    const form = document.querySelector('form');
    const summary = document.querySelector('#summary');
    const adultName = document.querySelector('#adult_name').value;
    const totalParticipants = document.querySelectorAll('.participant-section, .participant1').length;
    const fees = totalFees();
    const info = {
        name: adultName,
        participants: totalParticipants,
        totalFees: fees
    };

    form.classList.add('hide');
    summary.innerHTML = successTemplate(info);
    summary.classList.remove('hide');
}
document.querySelector('form').addEventListener('submit', submitForm);