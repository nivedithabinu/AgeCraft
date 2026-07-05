export function future(dob, today) {
    const age20 = new Date(dob.getFullYear() + 20, dob.getMonth(), dob.getDate());
    const age40 = new Date(dob.getFullYear() + 40, dob.getMonth(), dob.getDate());
    const days50k = new Date(dob.getTime() + (50000 * 24 * 60 * 60 * 1000));

    const format = (d) => d.toLocaleDateString('en', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });

    return `
    <div class="timeline-container">
        <div class="timeline-item ${age20 < today ? 'achieved' : ''}">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>Level 20 Unlocked</h3>
                <p>${format(age20)}</p>
            </div>
        </div>

        <div class="timeline-item ${age40 < today ? 'achieved' : ''}">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>Level 40 Unlocked</h3>
                <p>${format(age40)}</p>
            </div>
        </div>

        <div class="timeline-item ${days50k < today ? 'achieved' : ''}">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>50,000 Days Old</h3>
                <p>${format(days50k)}</p>
            </div>
        </div>
    </div>`;
}