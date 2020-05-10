import { StyleSheet } from "react-native";

export const header = StyleSheet.create({
  header: {
    paddingTop: 30,
    backgroundColor: "#1c1c1c",
    flexDirection: "row",
  },

  headerText: {
    padding: 10,
    color: "white",
    fontSize: 30,
  },
});

export const card = StyleSheet.create({
  card: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#141414",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
  },

  todoItem: {
    marginLeft: 8,
    lineHeight: 25,
    fontSize: 16,
    color: "white",
    marginRight: 55,
  },
});

export const todos = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#2b2b2b",
  },

  emptyTodosText: {
    color: "white",
    fontSize: 20,
    borderColor: "#A3661C",
    backgroundColor: "#151d3d",
    borderWidth: 2,
    borderRadius: 15,
    alignSelf: "center",
    padding: 20,
  },

  todoInput: {
    borderWidth: 2,
    borderColor: "#A3661C",
    color: "white",
    padding: 10,
    fontSize: 18,
    borderRadius: 15,
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
  },

  btn: {
    alignSelf: "center",
  },

  bottomPart: {
    backgroundColor: "#1c1c1c",
    paddingTop: 20,
    paddingBottom: 5,
    marginBottom: -10,
    // marginTop: 3,
    alignSelf: "center",
    width: "110%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
