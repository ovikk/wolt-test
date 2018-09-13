import React from "react";
import { StyleSheet, ScrollView, RefreshControl, StatusBar } from "react-native";
import styled from "styled-components";

import { fetchShifts, bookShift, cancelShift } from "../actions";
import { connect } from "react-redux";

import ShiftContainer from "./common/ShiftContainer";
import TitleContainer from "./common/TitleContainer";

class AllShifts extends React.Component {
    constructor(props) {
        super(props);

        this.changeActiveTab = this.changeActiveTab.bind(this);

        this.state = {
            activeTab: "Helsinki",
            helsinkiCount: this.getCityCounts("Helsinki"),
            tampereCount: this.getCityCounts("Tampere"),
            turkuCount: this.getCityCounts("Turku")
        };
    }

    changeActiveTab(activeTab) {
        if (this.state.activeTab !== activeTab) {
            this.setState({ activeTab });
        }
    }

    getCityCounts(city) {
        return this.props.shifts.shifts.reduce((acc, o) => {
            if (o.area === city) acc = acc + 1;
            return acc;
        }, 0);
    }

    renderAll() {
        var titleVar = "wolt";
        const shiftarray = this.props.shifts.shifts.filter(o => o.area === this.state.activeTab);
        return shiftarray.map((o, i) => {
            const acc = [];
            if (o.day !== titleVar) {
                titleVar = o.day;
                acc.push(<TitleContainer title={o.day} key={"title" + i} />);
            }

            let statusText = "";
            let statusColor = "";
            let buttonColor = "";
            let buttonText = "";

            if (o.booked) {
                statusText = "Booked";
                statusColor = "blue";
                buttonText = "Cancel";
                buttonColor = "red";
                if (o.ongoin) {
                    buttonText = "Book";
                    buttonColor = "gray";
                }
            } else {
                statusText = "";
                buttonText = "Book";
                buttonColor = "green";
                if (o.overlap) {
                    buttonColor = "gray";
                    statusText = "Overlapping";
                    statusColor = "red";
                }
            }

            acc.push(
                <ShiftContainer
                    time={`${o.startHour} - ${o.endHour}`}
                    city={o.area}
                    statusText={statusText}
                    statusColor={statusColor}
                    buttonColor={buttonColor}
                    buttonText={buttonText}
                    key={i}
                    id={o.id}
                    onBook={() => this.props.bookShift(o)}
                    onCancel={() => this.props.cancelShift(o)}
                    loading={o.loading}
                />
            );
            return acc;
        });
    }

    render() {
        return (
            <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={this.props.shifts.loading} onRefresh={this.props.fetchShifts} />}>
                <StatusBar hidden={true} />
                <TopCityBarContainer>
                    <CityText onPress={() => this.changeActiveTab("Helsinki")} active={this.state.activeTab === "Helsinki"}>
                        Helsinki ({this.state.helsinkiCount})
                    </CityText>
                    <CityText onPress={() => this.changeActiveTab("Tampere")} active={this.state.activeTab === "Tampere"}>
                        Tampere ({this.state.tampereCount})
                    </CityText>
                    <CityText onPress={() => this.changeActiveTab("Turku")} active={this.state.activeTab === "Turku"}>
                        Turku ({this.state.turkuCount})
                    </CityText>
                </TopCityBarContainer>
                {this.renderAll()}
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
        shifts: state.shifts
    };
};

const mapDispatchToProps = dispatch => ({
    fetchShifts: () => {
        dispatch(fetchShifts());
    },
    bookShift: shift => {
        dispatch(bookShift(shift));
    },
    cancelShift: shift => {
        dispatch(cancelShift(shift));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllShifts);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});

const TopCityBarContainer = styled.View`
    width: 100%;
    height: 60px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 20;
    padding-right: 20;
    border-color: #cbd2e1;
    border-bottom-width: 1;
`;

const CityText = styled.Text`
    color: ${props => (props.active ? "#004FB4" : "#CBD2E1")};
    font-size: 20;
`;
