import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Empty, Input } from "antd";
import s from "./index.module.less";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "#00476F" : "#fff",
  color: !isDragging ? "#00476F" : "#fff",

  // styles we need to apply on draggables
  ...draggableStyle,
});

class DndComponent extends React.Component {
  constructor(props) {
    super(props);
    const { dataList = [], value = [] } = props;
    const intersection = dataList.filter((x) => value.includes(x?.id));
    const difference = dataList.filter((x) => !value.includes(x?.id));
    this.state = {
      items: difference,
      selected: intersection,
      valueSearch: undefined,
    };
  }

  componentDidUpdate(_, prevState) {
    const { onChange, dataList = [], value = [] } = this.props;
    const { selected, valueSearch } = this.state;
    const difference = dataList.filter((x) => !value.includes(x?.id));
    if (prevState.selected !== selected) {
      const idListSelected = selected.map((item) => item?.id);
      onChange?.(idListSelected);
    }
    if (prevState?.valueSearch !== valueSearch) {
      const itemsDisplay = valueSearch
        ? difference.filter(
            (item) =>
              item.name.toLowerCase().indexOf(valueSearch.toLowerCase()) >= 0
          )
        : difference;
      this.setState({
        items: itemsDisplay,
      });
    }
  }

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: "items",
    droppable2: "selected",
  };

  getList = (id) => this.state[this.id2List[id]];

  onDragEnd = (result) => {
    const { items = [] } = this.state;
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state = { items };

      if (source.droppableId === "droppable2") {
        state = { selected: items };
      }

      this.setState(state);
    } else {
      const result = move(
        source.droppableId === "droppable"
          ? items
          : this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        items: result.droppable,
        selected: result.droppable2,
      });
    }
  };

  genViewEmpty = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <Empty />
      </div>
    );
  };

  handleChangeInput = (e) => {
    this.setState({ valueSearch: e.target.value });
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const { items = [], selected = [], valueSearch } = this.state;

    return (
      <div className={s.viewDnd}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={s.viewList}
                style={snapshot.isDraggingOver ? { background: "#F1F1F1" } : {}}
              >
                <div className={s.title}>
                  <span>Danh sách chức năng có thể thêm</span>
                  <Input
                    placeholder="Tìm kiếm chức năng"
                    style={{ marginTop: "0.5rem" }}
                    onChange={this.handleChangeInput}
                  />
                  {valueSearch && (
                    <p>Đang tìm kiếm theo "{`${valueSearch}`}"</p>
                  )}
                </div>

                {items.length === 0
                  ? this.genViewEmpty()
                  : items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={s.itemDraggable}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            {item?.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="droppable2">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={s.viewList}
                style={snapshot.isDraggingOver ? { background: "#F1F1F1" } : {}}
              >
                <div className={s.title}>Chức năng đã thêm vào khu vực</div>
                {selected.length === 0
                  ? this.genViewEmpty()
                  : selected.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={s.itemDraggable}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            {item?.name}
                          </div>
                        )}
                      </Draggable>
                    ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
export default DndComponent;
