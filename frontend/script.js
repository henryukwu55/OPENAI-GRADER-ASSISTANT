// BLOCK 2: Selecting UI Elements
const submitButton = document.getElementById("submit");
const fileInput = document.getElementById("fileInput");
const rubricsTextarea = document.getElementById("rubrics");
const googleDocLink = document.getElementById("googleDocLink");
const outputDiv = document.getElementById("output");

// BLOCK 3: Handling Click Event
submitButton.addEventListener("click", async () => {
  const file = fileInput.files[0];
  const rubrics = rubricsTextarea.value.trim();
  const docLink = googleDocLink.value;

  // BLOCK 4: File Type Validation
  if (!file && !docLink) {
    outputDiv.textContent =
      "Please upload a Word document or submit a Google Docs link.";
    alert("Please upload a valid document or provide a Google Docs link.");
    return;
  }
  if (file && docLink) {
    outputDiv.textContent =
      "Please upload either a document or provide a Google Docs link, not both.";
    alert(
      "Please submit only one: either a Word document or a Google Docs link."
    );
    return;
  }

  if (file) {
    if (file.size > 50 * 1024 * 1024) {
      outputDiv.textContent = "File size exceeds the 50 MB limit.";
      return;
    }
    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      outputDiv.textContent = "Please upload a valid .docx file.";
      alert("Your document is not valid. Please upload a valid document.");
      return;
    }
  }

  // BLOCK 5: Rubrics Validation
  const maxRubricsLength = 5000;
  if (!rubrics) {
    outputDiv.textContent = "Please provide rubrics for grading.";
    alert("Please provide rubrics.");
    return;
  }
  if (rubrics.length > maxRubricsLength) {
    outputDiv.textContent = `Rubrics exceed the maximum allowed length of ${maxRubricsLength} characters.`;
    alert("Please keep rubrics under 5000 characters.");
    return;
  }

  // BLOCK 6: Sending Data to Server
  const formData = new FormData();
  if (file) {
    formData.append("document", file);
  }
  formData.append("rubrics", rubrics);
  formData.append("googleDocLink", docLink);

  // BLOCK 7: Server Request
  try {
    const response = await fetch("http://localhost:3000/api/grade", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      // Display the full data (can be for debugging or logging) and feedback
      console.log("Full Response Data:", result.data); // Display full response in console (for debugging)
      // Log the entire response to the console for debugging
      // console.log("Response Data:", data);

      // Display the feedback to the user
      outputDiv.innerHTML = `
        <h3>Feedback:</h3>
        <p>${data.feedback}</p>
        <hr>
        <h4>Additional Data:</h4>
        <pre>${JSON.stringify(data.data, null, 2)}</pre>
      `;
      outputDiv.textContent = JSON.stringify(data, null, 2);

      return;
    } else {
      outputDiv.textContent = `Error: ${result.error}`;
    }
  } catch (error) {
    outputDiv.textContent = `Network or server error. Please try again later.`;
  }
});

// // BLOCK 2: Selecting UI Elements
// const submitButton = document.getElementById("submit");
// const fileInput = document.getElementById("fileInput");
// const rubricsTextarea = document.getElementById("rubrics");
// const googleDocLink = document.getElementById("googleDocLink");
// const outputDiv = document.getElementById("output");

// // BLOCK 3: Handling Click Event
// submitButton.addEventListener("click", async () => {
//   const file = fileInput.files[0];
//   const rubrics = rubricsTextarea.value.trim();
//   const docLink = googleDocLink.value;

//   // BLOCK 4: File Type Validation
//   if (!file && !docLink) {
//     outputDiv.textContent =
//       "Please upload a Word document or submit a Google Docs link.";
//     alert("Please upload a valid document or provide a Google Docs link.");
//     return;
//   }
//   if (file && docLink) {
//     outputDiv.textContent =
//       "Please upload either a document or provide a Google Docs link, not both.";
//     alert(
//       "Please submit only one: either a Word document or a Google Docs link."
//     );
//     return;
//   }

//   if (file) {
//     if (file.size > 50 * 1024 * 1024) {
//       outputDiv.textContent = "File size exceeds the 50 MB limit.";
//       return;
//     }
//     if (
//       file.type !==
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     ) {
//       outputDiv.textContent = "Please upload a valid .docx file.";
//       alert("Your document is not valid. Please upload a valid document.");
//       return;
//     }
//   }

//   // BLOCK 5: Rubrics Validation
//   const maxRubricsLength = 5000;
//   if (!rubrics) {
//     outputDiv.textContent = "Please provide rubrics for grading.";
//     alert("Please provide rubrics.");
//     return;
//   }
//   if (rubrics.length > maxRubricsLength) {
//     outputDiv.textContent = `Rubrics exceed the maximum allowed length of ${maxRubricsLength} characters.`;
//     alert("Please keep rubrics under 5000 characters.");
//     return;
//   }

//   // BLOCK 6: Sending Data to Server
//   const formData = new FormData();
//   if (file) {
//     formData.append("document", file);
//   }
//   formData.append("rubrics", rubrics);
//   formData.append("googleDocLink", docLink);

//   // BLOCK 7: Server Request
//   try {
//     // const response = await fetch("/api/grade", {
//     //   method: "POST",
//     //   body: formData,
//     // });

//     const response = await fetch("http://localhost:3000/api/grade", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await response.json();
//     if (response.ok) {
//       outputDiv.textContent = data.feedback;
//     } else {
//       outputDiv.textContent = `Error: ${data.error}`;
//     }
//   } catch (error) {
//     outputDiv.textContent = `Network or server error. Please try again later.`;
//   }
// });
