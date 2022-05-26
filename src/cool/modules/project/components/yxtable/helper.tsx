export function useElTableApi({ refs }: any) {
	function clearSelection() {
		if (refs.value.table) {
			refs.value.table.clearSelection();
		}
	}

	function toggleRowSelection(row: any, selected?: boolean) {
		if (refs.value.table) {
			refs.value.table.toggleRowSelection(row, selected);
		}
	}

	function toggleAllSelection() {
		if (refs.value.table) {
			refs.value.table.toggleAllSelection();
		}
	}

	function toggleRowExpansion(row: any, expanded?: boolean) {
		if (refs.value.table) {
			refs.value.table.toggleRowExpansion(row, expanded);
		}
	}

	function setCurrentRow(row: any) {
		if (refs.value.table) {
			refs.value.table.setCurrentRow(row);
		}
	}

	function clearSort() {
		if (refs.value.table) {
			refs.value.table.clearSort();
		}
	}

	function clearFilter(columnKey: any) {
		if (refs.value.table) {
			refs.value.table.clearFilter(columnKey);
		}
	}

	function doLayout() {
		if (refs.value.table) {
			refs.value.table.doLayout();
		}
	}

	function sort(prop: string, order: string) {
		if (refs.value.table) {
			refs.value.table.sort(prop, order);
		}
	}

	return {
		clearSelection,
		toggleRowSelection,
		toggleAllSelection,
		toggleRowExpansion,
		setCurrentRow,
		clearSort,
		clearFilter,
		doLayout,
		sort
	};
}
