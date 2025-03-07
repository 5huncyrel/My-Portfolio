fetch("../Subjects-Taken/courses.json")
    .then(response => response.json())
    .then(data => {
        let coursesTable = document.getElementById("courses-list").getElementsByTagName("tbody")[0];
        coursesTable.innerHTML = ""; // Clear previous content

        if (data.courses && Array.isArray(data.courses)) {
            let groupedCourses = {};

            // Group subjects by year and semester
            data.courses.forEach(course => {
                let key = `${course.year_level} Year - ${course.sem} Semester`;
                if (!groupedCourses[key]) {
                    groupedCourses[key] = [];
                }
                groupedCourses[key].push(course);
            });

            // Display grouped subjects in a table
            for (let key in groupedCourses) {
                // Add a row for the year and semester heading (optional)
                let headerRow = document.createElement("tr");
                let headerCell = document.createElement("td");
                headerCell.colSpan = 5;
                headerCell.textContent = key;
                headerCell.style.fontWeight = "bold";
                headerCell.style.backgroundColor = "#f0f0f0"; // Light background for header row
                headerRow.appendChild(headerCell);
                coursesTable.appendChild(headerRow);

                // Add courses for each group
                groupedCourses[key].forEach(course => {
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
            }
        } else {
            console.error("Expected 'courses' array but got:", data);
        }
    })
    .catch(error => console.error("Error fetching JSON:", error));
