import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Column, Divider, Heading, IconButton, Label, Text, TextArea } from 'gestalt';
import _ from 'lodash';
import moment from 'moment';
import { WithContext as ReactTags } from 'react-tag-input';
import { fetchEntriesDaily, createEntry, updateEntry, getTags } from '../../actions';

class EditDailyEntry extends Component {
  constructor(props) {
    super(props);
    const { dateStr } = props.match.params;
    this.state = {
      dateStr: dateStr,
      entry: newEntry(dateStr)
    }
  }

  componentWillMount() {
    this.props.fetchEntriesDaily(this.state.dateStr, this.state.dateStr);
    this.props.getTags();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => ({ entry: nextProps.entry }));
  }

  // mood section
  renderMoodSection(entry) {
    return (
      <Column span={12}>
        <Box paddingY={2} paddingX={4} display="flex" alignItems="center">
          <Column span={4}>
            <Label htmlFor="mood_score">
              <Text align="left" bold>Mood Score</Text>
            </Label>
          </Column>
          <Column span={8}>
            <Box display="flex" direction="row">
            {
              [...Array(5).keys()].map(i => (
                <IconButton
                  key={i}
                  accessibilityLabel={`Select ${i+1} Stars`}
                  icon="smiley-outline"
                  iconColor={entry.mood_score > i ? 'red' : 'gray'}
                  onClick={() => this.handleMoodSelect(i+1)}
                />
              ))
            }
            </Box>
          </Column>
        </Box>
        <Box paddingY={2} paddingX={4} display="flex" alignItems="center">
          <Column span={4}>
            <Label htmlFor="mood_reason">
              <Text align="left" bold>Mood Reason</Text>
            </Label>
          </Column>
          <Column span={8}>
            <TextArea
              id="mood_reason"
              onChange={this.handleMoodReason.bind(this)}
              value={entry.mood_reason}
              placeholder="Describe your mood"
              rows={2}
            />
          </Column>
        </Box>
      </Column>
    );
  }

  handleMoodSelect(mood) {
    const { entry } = this.state;
    entry.mood_score = mood;
    this.setState(prevState => ({ entry }));
  }

  handleMoodReason({ value }) {
    const { entry } = this.state;
    entry.mood_reason = value;
    this.setState(prevState => ({ entry }));
  }

  // end mood section

  // update section

  drawUpdate(update, idx) {
    const tags = _.map(update.tags, tag => ({ text: tag.tag, id: tag.tag }));
    return (
      <Box key={idx}>
        <Box paddingY={2} paddingX={4} display="flex" alignItems="center">
          <Column span={4}>
            <Label htmlFor={`update${idx}`}>
              <Text align="left" bold>Update</Text>
            </Label>
          </Column>
          <Column span={8}>
            <TextArea 
              id={`update${idx}`}
              value={update.body}
              onChange={(e) => this.handleChangeUpdate(e.value, idx)}
            />
          </Column>
        </Box>
        <Box paddingY={2} paddingX={4} display="flex" alignItems="center">
          <Column span={4}>
            <Label htmlFor={`tags${idx}`}>
              <Text align="left" bold>Tags</Text>
            </Label>
          </Column>
          <Column span={8}>
            <ReactTags
              tags={tags}
              handleDelete={(e) => this.handleDeleteTag(e, idx)}
              handleAddition={(e) => this.handleAddTag(e, idx)}
              suggestions={this.props.tags}
            />
          </Column>
        </Box>
        <Box display="flex" direction="row" justifyContent="end" right>
          <IconButton
            accessibilityLabel="Delete"
            icon="remove"
            iconColor="red"
            onClick={() => this.removeUpdate(idx)}
          />
        </Box>
        <Divider />
      </Box>
    );
  }

  addUpdate() {
    const { entry } = this.state;
    entry.updates.push({
      body: '',
      tags: []
    });
    this.setState(prevState => ({ entry }));    
  }

  handleChangeUpdate(body, idx) {
    const { entry } = this.state;
    entry.updates[idx].body = body;
    this.setState(prevState => ({ entry }));
  }

  removeUpdate(idx) {
    let { entry } = this.state;
    entry.updates = entry.updates.filter((update, i) => i !== idx)
    this.setState(prevState => ({ entry }));
  }

  handleAddTag(tag, idx) {
    let { entry } = this.state;
    entry.updates[idx].tags.push({ tag: tag.text, id: tag.text });
    this.setState(prevState => ({ entry }));
  }

  handleDeleteTag(tagIdx, updateIdx) {
    const { entry } = this.state;
    entry.updates[updateIdx].tags = entry.updates[updateIdx].tags.filter((tag, i) => i !== tagIdx);
    this.setState(prevState => ({ entry }));
  }

  // end update section

  leavePageFn() {
    this.props.history.push(`/weekly/${moment(this.state.dateStr).startOf('isoWeek').format('YYYY-MM-DD')}`);
  }

  handleSave() {
    const { entry } = this.state;
    if (entry.id) {
      this.props.updateEntry(entry, this.leavePageFn.bind(this));
    } else {
      this.props.createEntry(entry, this.leavePageFn.bind(this));
    }
  }

  handleCancel() {
    this.leavePageFn();
  }

  render() {
    const { dateStr, entry } = this.state;
    return (
      <Box>
        <Box margin={4} display="flex" direction="row" alignItems="center" alignContent="center">
          <Heading size="xs">{'Edit Daily Entry: ' + moment(dateStr).format('dddd, MMMM Do')}</Heading>
        </Box>
        <Divider />
        {this.renderMoodSection(entry)}
        <Divider />
        <Box margin={4} display="flex" direction="row" alignItems="center" alignContent="center">
          <Heading size="xs">Project Updates</Heading>
        </Box>
        {_.map(entry.updates, (update, i) => this.drawUpdate(update, i))}
        <Box margin={3} display="flex" direction="row" alignItems="center" alignContent="center">
          <Text align="left" bold>Add an Update</Text>
          <IconButton
            accessibilityLabel="add an update"
            icon="add-circle"
            iconColor="red"
            size="xl"
            onClick={this.addUpdate.bind(this)}
          />
        </Box>
        <Divider />
        <Box padding={1} display="flex" direction="row" justifyContent="end" right>
          <Box marginRight={1}>
            <Button
              text="Cancel"
              onClick={this.handleCancel.bind(this)}
              inline
            />
          </Box>
          <Button
            text="Save"
            onClick={this.handleSave.bind(this)}
            color="red"
            inline
          />
        </Box>
      </Box>
    );
  }
}

function mapStateToProps({ daily_entries, tags }, ownProps) {
  const { dateStr } = ownProps.match.params;
  return {
    entry: daily_entries[dateStr] || newEntry(dateStr),
    tags: _.map(tags, (tag) => ({ id: tag, text: tag }))
  }
}

function newEntry(dateStr) {
  return {
    date_string: dateStr,
    mood_score: 0,
    mood_reason: '',
    updates: []
  };
}

export default connect(mapStateToProps, { fetchEntriesDaily, createEntry, updateEntry, getTags })(EditDailyEntry);
