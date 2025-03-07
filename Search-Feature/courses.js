fetch("course.json")
    .then(response => response.json())
    .then(data => {
        const coursesTable = document.getElementById("courses-list").getElementsByTagName("tbody")[0];
        const searchInput = document.getElementById("searchInput");
        coursesTable.innerHTML = ""; // Clear previous content

        // Function to display courses
        function displayCourses(courses) {
            coursesTable.innerHTML = ""; // Clear previous rows

            if (courses && Array.isArray(courses)) {
                let groupedCourses = {};

                // Group subjects by year and semester
                courses.forEach(course => {
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
        }

        // Display all courses initially
        displayCourses(data.courses);

        // Function to normalize year level (remove suffixes like "st", "nd", "rd", "th" and convert to plain number)
        function normalizeYearLevel(yearLevel) {
            return yearLevel.toLowerCase().replace(/(st|nd|rd|th)/g, "").trim(); 
        }

        // Search functionality
        searchInput.addEventListener("input", function () {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const normalizedSearchTerm = normalizeYearLevel(searchTerm); // Normalize search term

            const filteredCourses = data.courses.filter(course => {
                return (
                    course.code.toLowerCase().includes(searchTerm) ||
                    course.description.toLowerCase().includes(searchTerm) ||
                    normalizeYearLevel(course.year_level).includes(normalizedSearchTerm) || // Compare without suffix
                    normalizeYearLevel(course.sem).includes(normalizedSearchTerm) // Allow search by semester
                );
            });

            displayCourses(filteredCourses); // Display the filtered courses
        });
    })
    .catch(error => console.error("Error fetching JSON:", error));
