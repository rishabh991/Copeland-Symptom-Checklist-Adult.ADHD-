const { jsPDF } = window.jspdf;

const mcqs = [
  { 
    category: "Inattention / Distractibility", 
    questions: [
      "A short attention span, especially for low-interest activities.",
      "Difficulty completing tasks.",
      "Daydreaming.",
      "Easily distracted.",
      "Nicknames such as: 'spacey' or 'dreamer'.",
      "Engages in much activity but accomplishes little.",
      "Enthusiastic beginnings but poor endings."
    ] 
  },
  { 
    category: "Impulsivity", 
    questions: [
      "Excitability.",
      "Low frustration tolerance.",
      "Acts before thinking.",
      "Disorganization.",
      "Poor planning ability.",
      "Excessively shifts from one activity to another.",
      "Difficulty in group situations requiring patience and taking turns.",
      "Interrupts frequently."
    ] 
  }
];

function renderMCQs() {
  mcqs.forEach((section, sectionIndex) => {
    const sectionTitle = document.createElement('h3');
    sectionTitle.textContent = `${section.category}`;
    form.appendChild(sectionTitle);
    
    section.questions.forEach((question, questionIndex) => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
      
      const questionTitle = document.createElement('p');
      questionTitle.textContent = `${questionIndex + 1}. ${question}`;
      questionDiv.appendChild(questionTitle);
      
      ['Not at all', 'Just a little', 'Pretty much', 'Very much'].forEach((option, optionIndex) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `section${sectionIndex}-question${questionIndex}`;
        input.value = optionIndex;
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        questionDiv.appendChild(label);
      });
      
      form.appendChild(questionDiv);
    });
  });
}

function calculateScore() {
  const scores = mcqs.map((section, sectionIndex) => {
    let score = 0;
    section.questions.forEach((_, questionIndex) => {
      const selected = document.querySelector(`input[name="section${sectionIndex}-question${questionIndex}"]:checked`);
      score += parseInt(selected?.value || 0);
    });
    return score;
  });

  return scores;
}

function generatePDF(userData, scores) {
  const doc = new jsPDF();
  doc.text(`Copeland Symptom Checklist Report`, 10, 10);
  doc.text(`Name: ${userData.name}`, 10, 20);
  doc.text(`Date: ${userData.date}`, 10, 30);
  doc.text(`Completed by: ${userData.completedBy}`, 10, 40);
  
  scores.forEach((score, index) => {
    doc.text(`${mcqs[index].category}: ${score}`, 10, 50 + (index * 10));
  });
  
  doc.save('ADHD_Report.pdf');
}

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const userData = {
    name: document.getElementById('user-name').value,
    date: document.getElementById('user-date').value,
    completedBy: document.getElementById('completed-by').value
  };
  const scores = calculateScore();
  generatePDF(userData, scores);
});

renderMCQs();
