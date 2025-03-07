fetch("courses.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Add this line to inspect the data being loaded
        const coursesTable = document.getElementById("courses-list").getElementsByTagName("tbody")[0];

        data.courses.forEach(course => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${course.year_level}</td>
                <td>${course.sem}</td>
                <td>${course.code}</td>
                <td>${course.description}</td>
                <td>${course.credit}</td>
            `;
            coursesTable.appendChild(row);
        });
    })
    .catch(error => console.error("Error loading courses:", error));
