import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from "react-native"

const { width, height } = Dimensions.get("window");

export default class ToDo1 extends Component {
    state = {
        isEditing: false,
        isCompleted: false,
        isCompleted: false,
        toDoValue: "" 
    };
    render() {
        const { isCompleted, isEditing, toDoValue} = this.state;
        const { text } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View 
                            style={[
                                styles.circle,
                                isCompleted ? styles.completedCircle : styles.uncompletedCircle
                            ]} 
                        />
                    </TouchableOpacity>
                    {isEditing ? (
                        <TextInput 
                            style={[
                                styles.text,
                                styles.input, 
                                isCompleted ? styles.completedText : styles.uncompletedText
                            ]}
                            value={toDoValue}
                            multiline={true}
                            onChangeText={this._controllInput}
                            returnKeyType={"done"}
                            onBlur={this._finishEditing}
                        />
                    ) : (
                        <Text 
                            style={[
                                styles.text,
                                isCompleted ? styles.completedText : styles.uncompletedText
                            ]} 
                        >
                            {text}
                        </Text>
                    )}
                </View>
                {isEditing ? (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionConatiner}>
                                <Text style={styles.actionText}>✅</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionConatiner}>
                                <Text style={styles.actionText}>✏️</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.actionConatiner}>
                                <Text style={styles.actionText}>❌</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }
    _toggleComplete = () => {
        this.setState(prevState => {
            return {
                isCompleted: !prevState.isCompleted // = !false
                // get previous state, 그리고 완성의 반대(미완성)를 이전 state에 주는거임.
                /*
                미완성. 클릭하면 완성이니까 회색.

                */
            };
        });
    };
    _startEditing = () => {
        const { text } = this.props;
        this.setState({
            isEditing: true,
            toDoValue: text
        });
    };
    _finishEditing = () => {
        this.setState({
            isEditing: false
        });
    };
    _controllInput = text => {
      this.setState({ toDoValue: text })  
    };
}


const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth:StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        // borderColor: "#bbb",
        borderWidth: 3,
        marginRight: 20
    },
    completedCircle: {
        borderColor: "#bbb"
    },
    uncompletedCircle : {
        borderColor: "#F23657"
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    },
    completedText: {
        color: "#bbb",
        textDecorationLine: "line-through"
    },
    uncompletedText: {
        color: "#353839",
        backgroundColor: "red"
    },
    column: {
        flexDirection: "row",
        alignItems: "center",
        width: width / 2,
        justifyContent: "space-between",
        // textAlign: "left"
    },
    actions: {
        flexDirection: "row"
    },
    actionConatiner: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        width: width / 2,
        marginVertical: 15,
        paddingBottom: 5,
        backgroundColor: "#000"
    }



}); 