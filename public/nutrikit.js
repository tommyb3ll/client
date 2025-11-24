document.addEventListener('DOMContentLoaded', function() {
    const foodData = {
        proteins: [
            { name: 'steak', calories: 300 },
            { name: 'ground beef', calories: 200 },
            { name: 'chicken', calories: 100 },
            { name: 'fish', calories: 80 },
            { name: 'soy', calories: 50 }
        ],
        fruits: [
            { name: 'orange', calories: 300 },
            { name: 'banana', calories: 200 },
            { name: 'pineapple', calories: 100 },
            { name: 'grapes', calories: 80 },
            { name: 'blueberries', calories: 50 }
        ],
        vegetables: [
            { name: 'romaine', calories: 30 },
            { name: 'green beans', calories: 40 },
            { name: 'squash', calories: 100 },
            { name: 'spinach', calories: 50 },
            { name: 'kale', calories: 10 }
        ],
        dairy: [
            { name: 'milk', calories: 300 },
            { name: 'yoghurt', calories: 200 },
            { name: 'cheddar cheese', calories: 200 },
            { name: 'skim milk', calories: 100 },
            { name: 'cottage cheese', calories: 80 }
        ],
        grains: [
            { name: 'bread', calories: 200 },
            { name: 'bagel', calories: 300 },
            { name: 'pita', calories: 250 },
            { name: 'naan', calories: 210 },
            { name: 'tortilla', calories: 120 }
        ]
    };

    const categorySelect = document.getElementById('categorySelect');
    const availableItems = document.getElementById('availableItems');
    const selectedItems = document.getElementById('selectedItems');
    const addRemoveBtn = document.getElementById('addRemoveBtn');
    const totalCaloriesEl = document.getElementById('totalCalories');

    let currentSelection = {
        list: null, // 'available' or 'selected'
        itemNode: null // the actual <option> element that is clicked
    };

    categorySelect.addEventListener('change', function() {
        const category = categorySelect.value;
        availableItems.innerHTML = ''; // clear existing items

        if (category && foodData[category]) {
            const items = foodData[category];
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const option = document.createElement('option');
                option.textContent = `${item.name} (${item.calories} cal)`;
                option.setAttribute('data-name', item.name);
                option.setAttribute('data-category', category);
                availableItems.appendChild(option);
            }
        }
    });

    availableItems.addEventListener('click', function(event) {
        if (event.target.tagName === 'OPTION') {
            selectedItems.selectedIndex = -1;
            currentSelection.list = 'available';
            currentSelection.itemNode = event.target;
            addRemoveBtn.textContent = 'Add -->';
        }
    });

    selectedItems.addEventListener('click', function(event) {
        if (event.target.tagName === 'OPTION') {
            availableItems.selectedIndex = -1;
            currentSelection.list = 'selected';
            currentSelection.itemNode = event.target;
            addRemoveBtn.textContent = '<-- Remove';
        }
    });

    addRemoveBtn.addEventListener('click', function() {
        if (!currentSelection.itemNode) {
            return; 
        }

        if (currentSelection.list === 'available') {
            const newOption = document.createElement('option');
            newOption.textContent = currentSelection.itemNode.textContent;
            newOption.setAttribute('data-name', currentSelection.itemNode.getAttribute('data-name'));
            newOption.setAttribute('data-category', currentSelection.itemNode.getAttribute('data-category'));
            selectedItems.appendChild(newOption);
        } else if (currentSelection.list === 'selected') {
            currentSelection.itemNode.remove();
        }

        updateTotalCalories();

        if (currentSelection.itemNode) {
            currentSelection.itemNode.selected = false;
        }
        currentSelection.list = null;
        currentSelection.itemNode = null;
        addRemoveBtn.textContent = '<-- -->';
    });

    function findFoodItem(category, name) {
        const items = foodData[category];
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === name) {
                return items[i];
            }
        }
        return null;
    }

    function updateTotalCalories() {
        let total = 0;
        const currentSelectedItems = selectedItems.options;

        for (let i = 0; i < currentSelectedItems.length; i++) {
            const option = currentSelectedItems[i];
            const name = option.getAttribute('data-name');
            const category = option.getAttribute('data-category');
            
            const foodItem = findFoodItem(category, name);
            if (foodItem) {
                total += foodItem.calories;
            }
        }
        totalCaloriesEl.textContent = total;
    }
});
